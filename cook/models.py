from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import SystemUserManager
from .enums import *
import os
from django.utils.deconstruct import deconstructible

class SystemUser(AbstractUser):
    USERNAME_FIELD = 'username'
    role = models.IntegerField(choices=Role.choices(), default=Role.PUBLIC, verbose_name=('نقش'))
    email = models.EmailField(verbose_name=('ایمیل'), unique=True)
    first_name = models.TextField(verbose_name=('نام'))
    last_name = models.TextField(verbose_name=('نام خانوادگی'))
    bio = models.CharField(verbose_name=('زندگینامه'), max_length=500, null=True)
    objects = SystemUserManager()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.data = dict(username=self.username, email=self.email, first_name=self.first_name,
                         last_name=self.last_name, bio=self.bio)

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
                              category=TicketCategory.get_category(self.category),
                              status=TicketStatus.get_status(self.status))


class Foodstuff (models.Model):
    """
    Model for Foodstuff
    """
    name = models.CharField(verbose_name=('نام قلم خوراکی'), max_length=100, primary_key=True)
    price = models.FloatField(verbose_name=('قیمت'))
    date_created = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.name}"


# Beef-250-1 : Beef, 250, gram
class Ingredient (models.Model):
    """
    Model for Ingredient
    """
    ingredient_key = models.CharField(verbose_name=('نام کلیدی ماده غذایی'), max_length=150, unique=True)
    foodstuff = models.ForeignKey(Foodstuff, on_delete=models.CASCADE)
    number =  models.IntegerField()
    unit = models.IntegerField(choices=UnitType.choices(), default=UnitType.GRAM)
    date_created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.number} {self.unit}'



@deconstructible
class PathRename(object):

    def __init__(self, sub_path):
        self.path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        filename = f'Recipe_{instance.name}.{ext}'
        
        return os.path.join(self.path, filename)

class Recipe(models.Model):
    """
    Model for Recipe
    """

    name = models.CharField(verbose_name=('نام'), max_length=100, primary_key=True) 
    description = models.TextField(verbose_name=('توضیحات'), max_length=350)
    ingredients = models.ManyToManyField(Ingredient)
    category = models.IntegerField(verbose_name=('دسته غذایی'), choices=FoodCategory.choices(), default=FoodCategory.IRANIAN)
    price = models.IntegerField(verbose_name=('قیمت'), null=True)
    difficulty = models.IntegerField(verbose_name=('درجه سختی'), choices=DifficultyType.choices(), default=DifficultyType.MEDIUM)
    preparation_time = models.IntegerField(verbose_name=('زمان تهیه'), choices=DurationType.choices(), default=DurationType.MEDIUM)
    meal_tags = models.TextField(verbose_name=('وعده‌های غذایی'), max_length=150)
    photo = models.FileField(verbose_name=("عکس غذا"), null=True, upload_to = PathRename('recipes/'), default='settings.MEDIA_ROOT/default_recipe.jpg')
    date_created = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.name}"