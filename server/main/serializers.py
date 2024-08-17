from rest_framework import serializers
from . import models


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = models.TodoAppUser
        fields = ('username', 'password', 'email', 'first_name', 'last_name')

    def create(self, validated_data):
        user = models.TodoAppUser.objects.create_user(**validated_data)
        return user


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Task
        fields = ["id", "description"]

