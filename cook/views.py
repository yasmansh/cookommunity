from django.http import HttpResponse
from datetime import datetime
from django.views.decorators.http import require_http_methods
from .models import *
from .dto.request import *
from .dto.response import *
import json

@require_http_methods(["POST"])
def register_user(request):
    request_model = UserRegistrationRequest(request)
    if SystemUser.objects.filter(username=request_model.username).exists():
        return HttpResponse(ErrorResponse(InternalError.ACCOUNT_EXISTS).json)
    user = SystemUser.objects.create(username=request_model.username)
    user.set_password(request_model.password)
    user.save()
    return HttpResponse()


@require_http_methods(["POST"])
def login_user(request):
    request_model = UserLoginRequest(request)
    if SystemUser.objects.filter(username=request_model.username).exists():
        user = SystemUser.objects.get(username=request_model.username)
        if not user.check_password(request_model.password):
            return HttpResponse(ErrorResponse(InternalError.CREDENTIAL_MISMATCH).json)
        user.last_login = datetime.now()
        user.save()
        return HttpResponse()
    else:
        return HttpResponse(ErrorResponse(InternalError.CREDENTIAL_MISMATCH).json)


@require_http_methods(["PUT"])
def logout_user(request):
    request_model = UserLogoutRequest(request)
    if SystemUser.objects.filter(username=request_model.username).exists():
        return HttpResponse()
    else:
        return HttpResponse(ErrorResponse(InternalError.CREDENTIAL_MISMATCH).json)


@require_http_methods(["GET", "POST"])
def profile(request, username):
    if SystemUser.objects.filter(username=username).exists() is False:  #Invalid user
        return HttpResponse(ErrorResponse(InternalError.CREDENTIAL_MISMATCH).json)
    user = SystemUser.objects.get(username=username)
    if request.method == "GET": 
        to_json = {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "bio": user.bio,
            "email": user.email,
            "role": user.role    
        }
        return HttpResponse(json.dumps(to_json), content_type='application/json')
    if request.method == "POST":
        request_model = UserUpdateProfileRequest(request)
        update_profile(request_model, user)
        return HttpResponse()


def update_profile(request, user):
    user.first_name = request.first_name
    user.last_name = request.last_name
    user.bio = request.bio
    user.email = request.email
    user.save()


@require_http_methods(["POST"])
def create_ticket(request):
    request_model = CreateTicketRequest(request.POST)
    ticket = Ticket(user=request_model.user, category=request_model.category, status=TicketStatus.NEW.value)
    ticket.save()
    return CreationResponse(ticket.id)


@require_http_methods(["PUT"])
def update_ticket(request):
    request_model = ModifyTicketRequest(request.POST)
    ticket = Ticket.objects.get(request_model.ticket_id)
    ticket.status = request_model.status
    ticket.save()
    category, status = TicketCategory.get_category(ticket.category), TicketStatus.get_status(ticket.status)
    if status == TicketStatus.DONE and category == TicketCategory.PRO_VERIFICATION:
        user = SystemUser.objects.get(username=ticket.user)
        user.role = Role.PRO.value
        user.save()
    return HttpResponse()


@require_http_methods(["POST"])
def create_foodstuff(request):
    request_model = FoodstuffInfoRequest(request)
    if Foodstuff.objects.filter(name=request_model.name).exists():
        return HttpResponse(ErrorResponse(InternalError.FOODSTUFF_EXISTS).json)
    foodstuff = Foodstuff.objects.create(name=request_model.name, price=request_model.price, is_vegan=request_model.is_vegan)
    foodstuff.save()
    return HttpResponse()


@require_http_methods(["POST"])
def update_foodstuff(request, name):
    if Foodstuff.objects.filter(name=name).exists() is False:  #Invalid Foodstuff
        return HttpResponse(ErrorResponse(InternalError.NO_MATCH).json)
    foodstuff = Foodstuff.objects.get(name=name)
    request_model = FoodstuffInfoRequest(request)
    foodstuff.price = request_model.price
    foodstuff.is_vegan = request_model.is_vegan
    foodstuff.save()
    return HttpResponse()


@require_http_methods(["POST"])
def create_category(request):
    request_model = CategoryInfoRequest(request)
    if Category.objects.filter(name=request_model.name).exists():
        return HttpResponse(ErrorResponse(InternalError.CATEGORY_EXIST).json)
    category = Category.objects.create(name=request_model.name, description=request_model.description)
    category.save()
    return HttpResponse()



@require_http_methods(["POST"])
def create_recipe(request):
    request_model = RecipeInfoRequest(request)
    if Recipe.objects.filter(name=request_model.name).exists():
        return HttpResponse(ErrorResponse(InternalError.RECIPE_EXIST).json)
    recipe = Recipe.objects.create(name=request_model.name, description=request_model.description,
        difficulty=request_model.difficulty, preparation_time=request_model.preparation_time,
        for_vegetarians=request_model.for_vegetarians, meal_tags=request_model.meal_tags,
        tools=request_model.tools)
    recipe.save()
    return HttpResponse()

    

@require_http_methods(["POST"])
def search_recipe_by_difficulty(request):
    request_model = GetDifficultyRequest(request)
    result_set = Recipe.objects.filter(difficulty=request_model.difficulty)
    results = [ob.as_json() for ob in result_set]
    return HttpResponse(json.dumps(results), content_type="application/json")


@require_http_methods(["POST"])
def search_recipe_by_preparation_time(request):
    request_model = GetPreprationTimeRequest(request)
    result_set = Recipe.objects.filter(preparation_time=request_model.preparation_time)
    results = [ob.as_json() for ob in result_set]
    return HttpResponse(json.dumps(results), content_type="application/json")

