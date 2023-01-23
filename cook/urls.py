from django.urls import path
from .views import *

urlpatterns = [
    path('accounts/', register_user, name='User registration'),
    path('accounts/login/', login_user, name='User log-in'),
    path('accounts/logout/', logout_user, name='User log-out'),
    path('accounts/<str:username>/profile/', profile, name='View/Modify a user\'s profile'),
    path('foodstuff/create/', create_foodstuff, name='Foodstuff Create'),
    path('ingredient/create/', create_ingredient, name='Ingredient Create'),
    path('recipe/create/', create_recipe, name='Recipe Create'),
    path('recipe/advanced_search/', advanced_search_recipe, name='Search Recipe'),
   # path('recipe/searchByDifficulty/', search_recipe_by_difficulty, name='Search Recipe By Difficulty'),
   # path('recipe/search_By_Preparation_Time/', search_recipe_by_preparation_time, name='Search Recipe By Preparation Time'),
    path('tickets/', create_ticket, name='Create a ticket'),
    path('tickets/<int:ticket_id>/update/', update_ticket, name='Modify a ticket')
]
