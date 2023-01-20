from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import SystemUserManager
from .enums import *
from django.core.validators import MinValueValidator, MaxValueValidator


class SystemUser(AbstractUser):
    USERNAME_FIELD = 'username'
    role = models.IntegerField(choices=Role.choices(), default=Role.PUBLIC, verbose_name=('نقش'))
    email = models.EmailField(verbose_name=('ایمیل'))
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
    Foodstuff_id = models.AutoField(primary_key=True)
    name = models.CharField(verbose_name=('نام ماده غذایی'), max_length=100)
    price = models.FloatField(verbose_name=('قیمت'))
    is_vegan = models.BooleanField(verbose_name=('گیاهی'), default=False)
    date_created = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.name}"


class Ingredient (models.Model):
    """
    Model for Ingredient
    """
    foodstuff = models.ForeignKey(Foodstuff, on_delete=models.CASCADE)
    weight =  models.IntegerField()


class Recipe(models.Model):
    """
    Model for Recipe
    """

    name = models.CharField(verbose_name=('نام'), max_length=100) 
    ingredients =  models.ManyToManyField(Ingredient)
    categories = models.IntegerField(choices=FoodCategory.choices(), default=FoodCategory.IRANIAN , verbose_name=('دسته غذایی'))
    description = models.TextField(verbose_name=('توضیحات'), max_length=350)
    price = models.IntegerField(verbose_name=('هزینه'), null=True)
    difficulty = models.IntegerField(choices=DifficultyType.choices(), default=DifficultyType.MEDIUM, verbose_name=('درجه سختی'))
    preparation_time = models.IntegerField(choices=DurationType.choices(), default=DurationType.MEDIUM, verbose_name=('مدت زمان آماده شدن'))
    meal_tags = models.TextField(verbose_name=('وعده‌های غذایی'), max_length=150)
    date_created = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.name} / {', '.join(self.category.values_list('name', flat=True))}"