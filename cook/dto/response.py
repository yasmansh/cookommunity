from enum import Enum

from simplejson import dumps as jw


class InternalError(Enum):
    ALREADY_REPORTED = (208, "این عملیات همینک انجام شده‌است.")
    CREDENTIAL_MISMATCH = (404, "چنین اطلاعات حسابی ثبت نشده‌است.")
    ACCOUNT_EXISTS = (409, "چنین حسابی همینک وجود دارد.")
    NO_MATCH = (404, "نتیجه‌ای یافت نشد.")
    FOODSTUFF_EXISTS = (409, "این قلم خوراکی در حال حاضر وجود دارد.")
    CATEGORY_EXIST = (409, "این دسته غذایی در حال حاضر وجود دارد.")
    RECIPE_EXIST = (409, "این دستور غذایی در حال حاضر وجود دارد.")
    ACCOUNT_NOT_FOUND = (404, "چنین حسابی وجود ندارد.")
    TICKET_NOT_FOUND = (404, "چنین تیکتی ثبت نشده است.")
    UNAUTHORIZED = (401, "شما دسترسی لازم را ندارید.")
    NOT_ALLOWED = (405, "عملیات مجاز نیست.")
    FORUM_NOT_FOUND = (404, "چنین فورومی ایجاد نشده است.")
    BANNED_USER = (405, "شما از پیوستن به این فوروم بازداشته‌ شده‌اید.")

    def get_code(self):
        return self.value[0]


class BaseResponse:
    def __init__(self, data):
        self.json = jw(data)


class ErrorResponse(BaseResponse):
    def __init__(self, error: InternalError):
        error_code, error_message = error.value[0], error.value[1]
        self.data = dict(err_c=error_code, err_msg=error_message)
        super().__init__(self.data)


class CreationResponse(BaseResponse):
    def __init__(self, object_id):
        self.data = dict(id=object_id)
        super().__init__(self.data)


class ObjectInfoResponse(BaseResponse):
    def __init__(self, obj, detail_obj=None):
        self.data: dict = obj.data_dict
        if detail_obj:
            self.data.update(detail_obj.data_dict)
        super().__init__(self.data)


class ObjectListResponse(BaseResponse):
    def __init__(self, objects):
        self.data = [obj.data_dict for obj in objects]
        super().__init__(self.data)


class ForumDetailedResponse(BaseResponse):
    def __init__(self, forum, members, messages):
        self.data = forum.data_dict
        self.data['members'] = [member.data_dict for member in members]
        self.data['messages'] = [message.data_dict for message in messages]
        super().__init__(self.data)
