from simplejson import loads as jr


class BaseRequest:
    def __init__(self, req, is_post=True):
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
    def __init__(self, req, is_post=True):
        super().__init__(req, is_post)
        self.first_name = self.data['first_name']
        self.last_name = self.data['last_name']
        # self.email = self.data['email']
        self.bio = self.data['bio']


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
