from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import SystemUserManager
from .enums import Role, TicketCategory, TicketStatus


class SystemUser(AbstractUser):
    USERNAME_FIELD = 'username'
    role = models.IntegerField(choices=Role.choices(), default=Role.PUBLIC)
    email = models.EmailField()
    first_name = models.TextField()
    last_name = models.TextField()

    objects = SystemUserManager()

    def __str__(self):
        return f'{self.first_name} {self.last_name}: {self.role}'


class Ticket(models.Model):
    ticket_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(SystemUser, on_delete=models.CASCADE)
    category = models.IntegerField()
    status = models.IntegerField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.data_dict = dict(id=self.ticket_id, username=self.user.username,
                              category=TicketCategory.get_category(self.category), status=TicketStatus.get_status(self.status))
