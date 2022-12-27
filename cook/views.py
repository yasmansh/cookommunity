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
    # TODO Yasaman
    if request.method == "GET":
        return view_profile(username)
    if request.method == "PATCH":
        return update_profile(request, username)


def view_profile(username):
    pass


def update_profile(request, username):
    pass


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
    return HttpResponse()
