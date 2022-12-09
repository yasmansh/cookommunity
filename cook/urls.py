from django.urls import path
from .views import *

urlpatterns = [
    path('accounts/', register_user, name='User registration'),
]