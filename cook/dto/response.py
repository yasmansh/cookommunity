from simplejson import dumps as jw


class BaseResponse:
    def __init__(self, data):
        self.json = jw(data)


class CreationResponse(BaseResponse):
    def __init__(self, object_id):
        self.data = dict(id=object_id)
        super().__init__(self.data)
