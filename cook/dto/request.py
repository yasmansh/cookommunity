from simplejson import loads as jr


class BaseRequest:
    def __init__(self, req, is_post=False):
        if is_post:
            self.data = req.POST.dict()
        else:
            self.data = jr(req.body.decode('utf-8').replace("'", "\""))


class UserRegistrationRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req)
        self.username = self.data['username']
        self.password = self.data['password']
        self.first_name = self.data['first_name']
        self.last_name = self.data['last_name']


class UserLoginRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req)
        self.username = self.data['username']
        self.password = self.data['password']


class UserLogoutRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req, is_post=False)
        self.username = self.data['username']

class UserUpdateProfileRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req)
        self.first_name = self.data['first_name']
        self.last_name = self.data['last_name']
        self.bio = self.data['bio']
        self.email = self.data['email']


class CreateTicketRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req)
        self.user = self.data['username']
        self.category = self.data['category']


class ModifyTicketRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req, is_post=False)
        self.ticket_id = self.data['ticket_id']
        self.status = self.data['status']



class FoodstuffInfoRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req)
        self.name = self.data['name']
        self.price = self.data['price']
        self.is_vegan = self.data['is_vegan']
    


class CategoryInfoRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req)
        self.name = self.data['name']
        self.description = self.data['description']
    



class RecipeInfoRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req)
        self.name = self.data['name']
        self.description = self.data['description']
        self.difficulty = self.data['difficulty']
        self.preparation_time = self.data['preparation_time']
        self.for_vegetarians = self.data['for_vegetarians']
        self.meal_tags = self.data['meal_tags']
        self.tools = self.data['tools']
      


class GetDifficultyRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req)
        self.difficulty = self.data['difficulty']
      
        


class GetPreprationTimeRequest(BaseRequest):
    def __init__(self, req):
        super().__init__(req)
        self.preparation_time = self.data['preparation_time']
      
        

        
