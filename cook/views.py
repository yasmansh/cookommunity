import operator
from functools import reduce

from django.db.models import Q
from django.http import HttpResponse
from django.utils import timezone
from django.views.decorators.http import require_http_methods
from .models import *
from .dto.request import *
from .dto.response import *
import json
from django.db import models


@require_http_methods(["POST"])
def register_user(request):
    request_model = UserRegistrationRequest(request)
    if get_object_else(('username', 'email'), (request_model.username, request_model.email), SystemUser, True):
        return HttpResponse(ErrorResponse(InternalError.ACCOUNT_EXISTS).json)
    user = SystemUser.objects.create(username=request_model.username, first_name=request_model.first_name,
                                     last_name=request_model.last_name, email=request_model.email)
    user.set_password(request_model.password)
    user.save()
    return HttpResponse()


@require_http_methods(["POST"])
def login_user(request):
    request_model = UserLoginRequest(request)
    user: SystemUser = get_object_else('username', request_model.username, SystemUser)
    if user:
        if not user.check_password(request_model.password):
            return HttpResponse(ErrorResponse(InternalError.CREDENTIAL_MISMATCH).json)
        user.last_login = timezone.now()
        user.save()
        return HttpResponse(ObjectInfoResponse(user).json)
    else:
        return HttpResponse(ErrorResponse(InternalError.CREDENTIAL_MISMATCH).json)


@require_http_methods(["PUT"])
def logout_user(request):
    request_model = UserLogoutRequest(request)
    if get_object_else('username', request_model.username, SystemUser, True):
        return HttpResponse()
    else:
        return HttpResponse(ErrorResponse(InternalError.CREDENTIAL_MISMATCH).json)


@require_http_methods(["GET", "PATCH"])
def profile(request, username):
    user: SystemUser = get_object_else('username', username, SystemUser)
    if not user:
        return HttpResponse(ErrorResponse(InternalError.CREDENTIAL_MISMATCH).json)
    chief = None
    if user.role == Role.CHIEF:
        chief = get_object_else('user__username', username, Chief)
    if request.method == "GET":
        return HttpResponse(ObjectInfoResponse(user, chief).json)
    if request.method == "PATCH":
        request_model = UserUpdateProfileRequest(request)
        update_profile(request_model, user, chief)
        return HttpResponse(ObjectInfoResponse(user, chief).json)


def update_profile(request, user, chief):
    user.first_name = request.first_name
    user.last_name = request.last_name
    user.email = request.email
    if chief:
        chief.bio = request.bio
        chief.save()
    user.save()


@require_http_methods(["POST", "GET"])
def tickets(request):
    if request.method == "GET":
        view_all_tickets(request)


def create_ticket(request):
    request_model = CreateTicketRequest(request)
    user: SystemUser = get_object_else('username', request_model.username, SystemUser)
    if not user:
        return HttpResponse(ErrorResponse(InternalError.ACCOUNT_NOT_FOUND))
    ticket = Ticket(user=user, category=request_model.category, status=TicketStatus.NEW.value, text=request_model.text)
    ticket.save()
    return HttpResponse(CreationResponse(ticket.ticket_id).json)


def view_all_tickets(request):
    username = request.GET.get('username')
    user: SystemUser = get_object_else('username', username, SystemUser)
    if not user:
        return HttpResponse(ErrorResponse(InternalError.ACCOUNT_NOT_FOUND))
    return HttpResponse(ObjectListResponse(user.ticket_set.all()).json)


@require_http_methods(["GET"])
def view_ticket(request, ticket_id):
    ticket: Ticket = get_object_else('ticket_id', ticket_id, Ticket)
    if not ticket:
        return HttpResponse(ErrorResponse(InternalError.TICKET_NOT_FOUND).json)
    return HttpResponse(ObjectInfoResponse(ticket).json)


@require_http_methods(["PATCH"])
def update_ticket(request, ticket_id):
    assignee_username = request.GET.get('assignee')
    assignee: SystemUser = get_object_else('username', assignee_username, SystemUser)
    if not assignee:
        return HttpResponse(ErrorResponse(InternalError.ACCOUNT_NOT_FOUND).json)
    request_model = ModifyTicketRequest(request)
    status = request_model.status
    ticket: Ticket = get_object_else('ticket_id', ticket_id, Ticket)
    if not ticket:
        return HttpResponse(ErrorResponse(InternalError.TICKET_NOT_FOUND).json)
    if not TicketStatus.check_next_status_validity(ticket.status, status, assignee.role):
        return HttpResponse(ErrorResponse(InternalError.NOT_ALLOWED).json)
    user = ticket.user
    if assignee.role != Role.ADMIN.value and assignee_username != user.username:
        return HttpResponse(ErrorResponse(InternalError.UNAUTHORIZED).json)
    ticket.status = status
    ticket.text = ticket.text + "\n***\n" + request_model.text
    ticket.save()
    if status == TicketStatus.DONE and TicketCategory.get_category(ticket.category) == TicketCategory.CHIEF_VERIFY:
        upgrade_to_chief(user)
    return HttpResponse(ObjectInfoResponse(ticket).json)


def upgrade_to_chief(user: SystemUser):
    user.role = Role.CHIEF.value
    user.save()
    chief = Chief(user=user)
    chief.save()


@require_http_methods(["POST"])
def create_foodstuff(request):
    request_model = FoodstuffInfoRequest(request)
    if get_object_else('name', request_model.name, Foodstuff, True):
        return HttpResponse(ErrorResponse(InternalError.FOODSTUFF_EXISTS).json)
    foodstuff = Foodstuff.objects.create(name=request_model.name, price=request_model.price,
                                         is_vegan=request_model.is_vegan)
    foodstuff.save()
    return HttpResponse()


@require_http_methods(["PUT"])
def update_foodstuff(request, name):
    foodstuff: Foodstuff = get_object_else('name', name, Foodstuff)
    if not foodstuff:
        return HttpResponse(ErrorResponse(InternalError.NO_MATCH).json)
    request_model = FoodstuffInfoRequest(request)
    foodstuff.price = request_model.price
    foodstuff.is_vegan = request_model.is_vegan
    foodstuff.save()
    return HttpResponse()


'''
@require_http_methods(["POST"])
def create_category(request):
    request_model = CategoryInfoRequest(request)
    if Category.objects.filter(name=request_model.name).exists():
        return HttpResponse(ErrorResponse(InternalError.CATEGORY_EXIST).json)
    category = Category.objects.create(name=request_model.name, description=request_model.description)
    category.save()
    return HttpResponse()

'''


@require_http_methods(["POST"])
def create_recipe(request):
    request_model = RecipeInfoRequest(request)
    if get_object_else('name', request_model.name, Recipe, True):
        return HttpResponse(ErrorResponse(InternalError.RECIPE_EXIST).json)
    recipe = Recipe.objects.create(name=request_model.name, description=request_model.description,
                                   difficulty=request_model.difficulty, preparation_time=request_model.preparation_time,
                                   meal_tags=request_model.meal_tags)
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
    request_model = GetPreparationTimeRequest(request)
    result_set = Recipe.objects.filter(preparation_time=request_model.preparation_time)
    results = [ob.as_json() for ob in result_set]
    return HttpResponse(json.dumps(results), content_type="application/json")


@require_http_methods(["PUT"])
def follow(request, jesus_username):
    disciple_username = request.GET.get('username')
    disciple: SystemUser = get_object_else('username', disciple_username, SystemUser)
    if not disciple:
        return HttpResponse(ErrorResponse(InternalError.ACCOUNT_NOT_FOUND).json)
    if disciple_username == jesus_username:
        return HttpResponse(ErrorResponse(InternalError.NOT_ALLOWED).json)
    jesus: Chief = get_object_else('user__username', jesus_username, Chief)
    if not jesus:
        return HttpResponse(ErrorResponse(InternalError.ACCOUNT_NOT_FOUND).json)
    if get_object_else(('jesus__user__username', 'disciple__username'), (jesus_username, disciple_username),
                       Relationship, True):
        return HttpResponse(ErrorResponse(InternalError.NOT_ALLOWED).json)
    relationship = Relationship(jesus=jesus, disciple=disciple)
    relationship.save()
    disciple: SystemUser = get_object_else('username', disciple_username, SystemUser)
    return HttpResponse(ObjectListResponse(disciple.relationship_set.all()).json)


@require_http_methods(["DELETE"])
def unfollow(request, jesus_username):
    disciple_username = request.GET.get('username')
    disciple: SystemUser = get_object_else('username', disciple_username, SystemUser)
    if not disciple:
        return HttpResponse(ErrorResponse(InternalError.ACCOUNT_NOT_FOUND).json)
    jesus: Chief = get_object_else('user__username', jesus_username, Chief)
    if not jesus:
        return HttpResponse(ErrorResponse(InternalError.ACCOUNT_NOT_FOUND).json)
    relationship: Relationship = get_object_else(('jesus__user__username', 'disciple__username'),
                                                 (jesus_username, disciple_username), Relationship)
    if relationship:
        relationship.delete()
    disciple: SystemUser = get_object_else('username', disciple_username, SystemUser)
    return HttpResponse(ObjectListResponse(disciple.relationship_set.all()).json)


@require_http_methods(["POST", "GET"])
def forums(request):
    if request.method == "POST":
        return create_forum(request)
    if request.method == "GET":
        return get_forums(request)


def create_forum(request):
    request_model = CreateForumRequest(request)
    owner: Chief = get_object_else('user__username', request_model.owner, Chief)
    if not owner:
        return HttpResponse(ErrorResponse(InternalError.ACCOUNT_NOT_FOUND).json)
    if get_object_else(('name', 'owner'), (request_model.name, owner), Forum, True):
        return HttpResponse(ErrorResponse(InternalError.ALREADY_REPORTED).json)
    forum = Forum(owner=owner, name=request_model.name)
    forum.save()
    return HttpResponse(CreationResponse(forum.forum_id).json)


def get_forums(request):
    username, is_owned = request.GET.get('username'), bool(int(request.GET.get('owned')))
    if is_owned:
        chief: Chief = get_object_else('user__username', username, Chief)
        if not chief:
            return HttpResponse(ErrorResponse(InternalError.ACCOUNT_NOT_FOUND).json)
        return HttpResponse(ObjectListResponse(chief.forum_set.all()).json)
    user: SystemUser = get_object_else('username', username, SystemUser)
    if not user:
        return HttpResponse(ErrorResponse(InternalError.ACCOUNT_NOT_FOUND).json)
    joined_forums = []
    for forum in Forum.objects.all():
        if user in forum.members.all():
            joined_forums.append(forum)
    return HttpResponse(ObjectListResponse(joined_forums).json)


@require_http_methods(["PATCH"])
def join_forum(request, forum_id):
    username = request.GET.get('username')
    forum: Forum = get_object_else('forum_id', forum_id, Forum)
    if not forum:
        return HttpResponse(ErrorResponse(InternalError.FORUM_NOT_FOUND).json)
    user: SystemUser = get_object_else('username', username, SystemUser)
    if not user:
        return HttpResponse(ErrorResponse(InternalError.ACCOUNT_NOT_FOUND).json)
    if user in forum.banned.all():
        return HttpResponse(ErrorResponse(InternalError.BANNED_USER).json)
    if check_forum_membership(user, forum_id):
        return HttpResponse(ErrorResponse(InternalError.ALREADY_REPORTED).json)
    forum.members.add(user)
    forum.members_count += 1
    forum.save()
    return HttpResponse(ObjectListResponse(check_forum_membership(user)).json)


@require_http_methods(["PATCH"])
def leave_forum(request, forum_id):
    username = request.GET.get('username')
    forum: Forum = get_object_else('forum_id', forum_id, Forum)
    if not forum:
        return HttpResponse(ErrorResponse(InternalError.FORUM_NOT_FOUND).json)
    user: SystemUser = get_object_else('username', username, SystemUser)
    if not user:
        return HttpResponse(ErrorResponse(InternalError.ACCOUNT_NOT_FOUND).json)
    if not check_forum_membership(user, forum_id):
        return HttpResponse(ErrorResponse(InternalError.ALREADY_REPORTED).json)
    forum.members.remove(user)
    forum.members_count -= 1
    forum.save()
    return HttpResponse(ObjectListResponse(check_forum_membership(user)).json)


@require_http_methods(["DELETE"])
def ban_from_forum(request, forum_id):
    owner_username = request.GET.get('owner')
    username = request.GET.get('username')
    forum: Forum = get_object_else('forum_id', forum_id, Forum)
    if not forum:
        return HttpResponse(ErrorResponse(InternalError.FORUM_NOT_FOUND).json)
    if not owner_username == forum.owner.user.username:
        return HttpResponse(ErrorResponse(InternalError.UNAUTHORIZED).json)
    user: SystemUser = get_object_else('username', username, SystemUser)
    if not user:
        return HttpResponse(ErrorResponse(InternalError.ACCOUNT_NOT_FOUND).json)
    if check_forum_membership(user, forum_id, banned=True):
        return HttpResponse(ErrorResponse(InternalError.ALREADY_REPORTED).json)
    forum.members.remove(user)
    forum.banned.add(user)
    forum.members_count -= 1
    forum.save()
    return HttpResponse(ObjectListResponse(forum.members.all()).json)


@require_http_methods(["DELETE"])
def delete_forum(request, forum_id):
    owner_username = request.GET.get('owner')
    chief: Chief = get_object_else('user__username', owner_username, Chief)
    if not chief:
        return HttpResponse(ErrorResponse(InternalError.ACCOUNT_NOT_FOUND).json)
    forum: Forum = get_object_else('forum_id', forum_id, Forum)
    if not forum:
        return HttpResponse(ErrorResponse(InternalError.FORUM_NOT_FOUND).json)
    if owner_username != forum.owner.user.username:
        return HttpResponse(ErrorResponse(InternalError.NOT_ALLOWED).json)
    forum.delete()
    return HttpResponse(HttpResponse(ObjectListResponse(chief.forum_set.all()).json))


@require_http_methods(["POST"])
def post_on_forum(request, forum_id):
    request_model = PostOnForumRequest(request)
    forum: Forum = get_object_else('forum_id', forum_id, Forum)
    if not forum:
        return HttpResponse(ErrorResponse(InternalError.FORUM_NOT_FOUND).json)
    sender: SystemUser = get_object_else('username', request_model.sender, SystemUser)
    if not sender:
        return HttpResponse(ErrorResponse(InternalError.ACCOUNT_NOT_FOUND).json)
    message = ForumMessage(sender=sender, text=request_model.text, forum=forum)
    message.save()
    return HttpResponse(ObjectListResponse(forum.forummessage_set.all()).json)


@require_http_methods(["GET"])
def view_forum(request, forum_id):
    username = request.GET.get('username')
    user: SystemUser = get_object_else('username', username, SystemUser)
    if not user:
        return HttpResponse(ErrorResponse(InternalError.ACCOUNT_NOT_FOUND).json)
    forum: Forum = get_object_else('forum_id', forum_id, Forum)
    if not forum:
        return HttpResponse(ErrorResponse(InternalError.FORUM_NOT_FOUND).json)
    if (user.role == Role.CHIEF and forum.owner.user.username != username) \
            or not check_forum_membership(user, forum_id):
        return HttpResponse(ErrorResponse(InternalError.UNAUTHORIZED).json)
    return HttpResponse(ForumDetailedResponse(forum, forum.members.all(), forum.forummessage_set.all()).json)


def check_forum_membership(user, forum_id=None, banned=False):
    if not forum_id:
        joined_forums = []
        for forum in Forum.objects.all():
            if user in forum.members.all():
                joined_forums.append(forum)
        return joined_forums
    forum: Forum = get_object_else('forum_id', forum_id, Forum)
    if banned:
        return user in forum.banned.all()
    return user in forum.members.all()


def get_object_else(pk_name, pk, entity, check_only: bool = False):
    if isinstance(pk_name, str):
        kwargs = {pk_name: pk}
    else:
        assert (isinstance(pk_name, list) or isinstance(pk_name, tuple)) and (isinstance(pk, list) or
                                                                              isinstance(pk, tuple))
        assert len(pk_name) == len(pk)
        kwargs = {pk_name[i]: pk[i] for i in range(len(pk_name))}
    entity: models.Model
    if not entity.objects.filter(**kwargs).exists():
        return None
    if check_only:
        return True
    return entity.objects.get(**kwargs)
