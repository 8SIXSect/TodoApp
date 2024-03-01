from django.db.models import QuerySet
from django.http import HttpResponse
from rest_framework import status
from rest_framework.views import Response
from rest_framework.viewsets import ModelViewSet

from .models import Task 
from . import serializers


class TasksViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = serializers.TaskSerializer


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

