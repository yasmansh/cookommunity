from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import SystemUserManager
from .enums import Role


class SystemUser(AbstractUser):
    USERNAME_FIELD = 'username'
    role = models.IntegerField(choices=Role.choices(), default=Role.PUBLIC)
    email = models.EmailField()
    first_name = models.TextField()
    last_name = models.TextField()

    objects = SystemUserManager()

    def __str__(self):
        return f'{self.first_name} {self.last_name}: {self.role}'
