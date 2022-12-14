from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import SystemUserManager
from .enums import Role


class SystemUser(AbstractUser):
    USERNAME_FIELD = 'username'
    role = models.IntegerField(choices=Role.choices(), default=Role.PUBLIC, verbose_name=('نقش'))
    email = models.EmailField(verbose_name=('ایمیل'))
    first_name = models.TextField(verbose_name=('نام'))
    last_name = models.TextField(verbose_name=('نام خانوادگی'))
    bio = models.CharField(verbose_name=('زندگینامه'), max_length=500, null = True)

    objects = SystemUserManager()

    def __str__(self):
        return f'{self.first_name} {self.last_name}: {self.role}'
