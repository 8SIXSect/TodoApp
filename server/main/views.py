from typing import Dict, Optional
from django.contrib.auth import authenticate, login
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.db.models import QuerySet
from django.http import HttpResponse, JsonResponse
from django.core.handlers.wsgi import WSGIRequest
from rest_framework import status
from rest_framework.views import APIView, Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Task, TodoAppUser 
from . import serializers


class TasksViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = serializers.TaskSerializer
    permission_classes = [IsAuthenticated] 

    def delete(self, request):
        task_id: int = request.data['id']

        task_queryset: QuerySet[Task] = Task.objects.filter(id=task_id)
        if not task_queryset.exists():
            return Response(f"Task with Id: {task_id} does not exist",
                            status=status.HTTP_404_NOT_FOUND)

        for task_object in task_queryset:
            task_object.delete()

        return HttpResponse(status=status.HTTP_204_NO_CONTENT)


    def patch(self, request):
        task_id: int = request.data['id']
        task_queryset: QuerySet[Task] = Task.objects.filter(id=task_id)
        
        if not task_queryset.exists():
            return Response(f"Task with Id: {task_id} does not exist",
                            status=status.HTTP_404_NOT_FOUND)
        
        task: Task = task_queryset.first()

        new_description: str = request.data['new_description']
        task.description = new_description
        task.save()

        return HttpResponse(status=status.HTTP_204_NO_CONTENT)


class UserCreateAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        # If the username already exists, this function should already handle that
        serializer = serializers.UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        username: str = request.data["username"]
        password: str = request.data["password"]

        # Data passed should have 'username' & 'password' fields
        authenticated_user: Optional[TodoAppUser] = authenticate(
            username=username, password=password
        )

        if authenticated_user is not None:
            login(request, authenticated_user)
            serializer = serializers.UserSerializer(authenticated_user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response("No user found that matches these credentials",
                        status=status.HTTP_401_UNAUTHORIZED)

