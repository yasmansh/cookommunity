from simplejson import loads as jr


class BaseRequest:
    def __init__(self, req, is_post=False):
        if is_post and len(req.POST) != 0:
            self.data = req.POST.dict()
        else:
            self.data = jr(req.body.decode('utf-8').replace("'", "\""))


class UserRegistrationRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req, is_post=True)
        self.username = self.data['username']
        self.password = self.data['password']
        self.first_name = self.data['first_name']
        self.last_name = self.data['last_name']
        self.email = self.data['email']


class UserLoginRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req, is_post=True)
        self.username = self.data['username']
        self.password = self.data['password']


class UserLogoutRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req, is_post=False)
        self.username = self.data['username']


class UserUpdateProfileRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req, is_post=True)
        self.first_name = self.data['first_name']
        self.last_name = self.data['last_name']
        self.bio = self.data['bio']
        self.email = self.data['email']


class CreateTicketRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req, is_post=True)
        self.username = self.data['username']
        self.category = self.data['category']


class ModifyTicketRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req, is_post=False)
        self.ticket_id = self.data['ticket_id']
        self.status = self.data['status']


class FoodstuffInfoRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req, is_post=True)
        self.name = self.data['name']
        self.price = self.data['price']


class IngredientInfoRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req, is_post=True)
        self.foodstuff_name = self.data['name']
        self.number = self.data['number']
        self.unit = self.data['unit']


class RecipeInfoRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req, is_post=True)
        self.name = self.data['name']
        self.description = self.data['description']
        self.category = self.data['category']
        self.difficulty = self.data['difficulty']
        self.preparation_time = self.data['preparation_time']
        self.meal_tags = self.data['meal_tags']
        self.ingredients = self.data['ingredients']

class SearchRecipeByNameRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req, is_post=True)
        self.name = self.data['name']
        

class SearchRecipeInfoRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req, is_post=True)
        self.category = self.data['category']
        self.difficulty = self.data['difficulty']
        self.preparation_time = self.data['preparation_time']
        self.meal_tags = self.data['meal_tags']
        self.ingredients = self.data['ingredients']


class GetDifficultyRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req)
        self.difficulty = self.data['difficulty']


class GetPreprationTimeRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req)
        self.preparation_time = self.data['preparation_time']
