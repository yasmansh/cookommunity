from simplejson import loads as jr


class BaseRequest:
    def __init__(self, json):
        self.data = jr(json.body)


class UserRegistrationRequest(BaseRequest):
    def __init__(self, json):
        super().__init__(json)
        self.username = self.data['username']
        self.password = self.data['password']
        self.first_name = self.data['first_name']
        self.last_name = self.data['last_name']


class UserUpdateProfileRequest(BaseRequest):
    def __init__(self, json):
        super().__init__(json)
        self.first_name = self.data['first_name']
        self.last_name = self.data['last_name']
        self.email = self.data['email']
        self.bio = self.data['bio']


class CreateTicketRequest(BaseRequest):
    def __init__(self, json):
        super().__init__(json)
        self.user = self.data['username']
        self.category = self.data['category']


class ModifyTicketRequest(BaseRequest):
    def __init__(self, json):
        super().__init__(json)
        self.ticket_id = self.data['ticket_id']
        self.status = self.data['status']