from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
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
    # TODO Yashar
    pass


@require_http_methods(["GET", "PATCH"])
def profile(request, username):
    request_model = UserUpdateProfileRequest(request)
    if request.method == "GET":
        user_info = view_profile(username)
        return ObjectInfoResponse(user_info)
    if request.method == "PATCH":
        return update_profile(request_model, username)


def view_profile(username):
    return SystemUser.objects.filter(username=username)._meta.get_fields()


def update_profile(request, username):
    user  =  SystemUser.objects.filter(username=username)
    user.first_name = request.first_name
    user.last_name = request.last_name
    user.bio = request.bio
    user.email = request.email
    user.save()


@require_http_methods(["POST"])
def create_ticket(request):
    request_model = CreateTicketRequest(request)
    ticket = Ticket(user=request_model.user, category=request_model.category, status=TicketStatus.NEW.value)
    ticket.save()
    return CreationResponse(ticket.id)


@require_http_methods(["PATCH"])
def update_ticket(request):
    request_model = ModifyTicketRequest(request)
    ticket = Ticket.objects.get(request_model.ticket_id)
    ticket.status = request_model.status
    ticket.save()
    category, status = TicketCategory.get_category(ticket.category), TicketStatus.get_status(ticket.status)
    if status == TicketStatus.DONE and category == TicketCategory.PRO_VERIFICATION:
        user = SystemUser.objects.get(username=ticket.user)
        user.role = Role.PRO.value
        user.save()
    return HttpResponse()
