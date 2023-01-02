from django.urls import path
from .views import *

urlpatterns = [
    path('accounts/', register_user, name='User registration'),
    path('tickets/', create_ticket, name='Create a ticket'),
    path('tickets/<int:id>/update/', update_ticket, name='Modify a ticket')
]
