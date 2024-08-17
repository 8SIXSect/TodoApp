from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . import models


admin.site.register(models.TodoAppUser, UserAdmin)
admin.site.register(models.Task)

