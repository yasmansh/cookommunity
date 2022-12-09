from simplejson import dumps as jw


class BaseResponse:
    def __init__(self, data):
        self.json = jw(data)
