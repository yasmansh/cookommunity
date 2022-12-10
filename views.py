from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from cookommunity import settings
from .models import *
from .dto.request import *
from .dto.response import *


@require_http_methods(["POST"])
def register_user(request):
    request_model = UserRegistrationRequest(request)
    SystemUser.objects.create_user(**request_model.data)
    return HttpResponse()


@require_http_methods(["POST"])
def login_user(request):
    # request_model = UserLoginRequest(request)
    # try:
    #     user = SystemUser.objects.get(username=request_model.username, password=request_model.password)
    #     return HttpResponse()
    # except user.DoesNotExist:
    #     return render(request,'error.html',  { 'title' : '500' })
    pass

@require_http_methods(["GET", "PATCH"])
def profile(request, username):
    request_model = UserUpdateProfileRequest(request)
    SystemUser.objects.update_or_create(**request_model.data)
    if request.method == "GET":
        return view_profile(username)
    if request.method == "PATCH":
        return update_profile(request, username)


def view_profile(username):
    pass


def update_profile(request, username):
    pass


@require_http_methods(["PATCH"])
def upgrade_user(request):
    # TODO Yashar
    pass


@require_http_methods(["PATCH"])
def approve_user_upgrade(request):
    # TODO Yashar
    pass
