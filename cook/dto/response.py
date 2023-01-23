from enum import Enum

from simplejson import dumps as jw


class InternalError(Enum):
    CREDENTIAL_MISMATCH = (404, "چنین اطلاعات حسابی ثبت نشده‌است.")
    ACCOUNT_EXISTS = (409, "چنین حسابی همینک وجود دارد.")
    NO_MATCH = (404, "نتیجه‌ای یافت نشد.")
    FOODSTUFF_EXISTS = (409, "این قلم خوراکی در حال حاضر وجود دارد.")
    INGREDIENT_EXISTS = (409, "این ماده غذایی در حال حاضر وجود دارد.")
    FOODSTUFF_NOT_FOUND = (409, "این قلم خوراکی یافت نشد.")
    INGREDIENT_NOT_FOUND = (409, "ماده غذایی یافت نشد.")
    CATEGORY_EXIST = (409, "این دسته غذایی در حال حاضر وجود دارد.")
    RECIPE_EXIST = (409, "این دستور غذایی در حال حاضر وجود دارد.")
    ACCOUNT_NOT_FOUND = (404, "چنین حسابی وجود ندارد.")
    TICKET_NOT_FOUND = (404, "چنین تیکتی ثبت نشده است.")
    ROLE_MISMATCH = (401, "بررسی‌کننده‌ی تیکت ادمین نیست.")
    NOT_ALLOWED = (405, "عملیات مجاز نیست.")

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
    def __init__(self, object_dict):
        super().__init__(object_dict)
