from django.contrib.auth.models import AbstractUser
from django.db import models


class TodoAppUser(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username


class Task(models.Model):
    """
    Represents a task in the TODO list that needs to be completed
    """

    user = models.ForeignKey(TodoAppUser, on_delete=models.CASCADE)
    description = models.CharField(max_length=100)

