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
        self.bio = self.data['bio']
        self.email = self.data['email']


class UserUpgradeRequest(BaseRequest):
    def __init__(self, json):
        super().__init__(json)


class AdminApproveUpgradeRequest(BaseRequest):
    def __init__(self, json):
        super().__init__(json)
        self.username = self.data['username']