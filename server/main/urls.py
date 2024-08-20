from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r"tasks", views.TasksViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path("register", views.UserCreateAPIView.as_view()),
    path("login", views.UserLoginAPIView.as_view()),
    path("api/set-csrf-token", views.set_csrf_token)
]

urlpatterns += router.urls
