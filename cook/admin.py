from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import SystemUser


class SystemAdmin(UserAdmin):
    model = SystemUser


admin.site.register(SystemUser, SystemAdmin)
