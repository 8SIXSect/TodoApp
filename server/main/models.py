from django.db import models


class Task(models.Model):
    """
    Represents a task in the TODO list that needs to be completed
    """

    description = models.CharField(max_length=100)

