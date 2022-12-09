from django.contrib.auth.base_user import BaseUserManager
from .enums import Role


class SystemUserManager(BaseUserManager):
    def create_user(self, username, password, role=Role.PUBLIC, **kwargs):
        if not username or not password:
            raise ValueError('The credentials must be set')
        user = self.model(username=username, password=password, role=role, **kwargs)
        user.save()
        return user

    def create_superuser(self, username, password):
        return self.create_user(username, password, role=Role.ADMIN, is_superuser=True, is_staff=True)


