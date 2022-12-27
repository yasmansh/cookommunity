from enum import IntEnum


class Role(IntEnum):
    PUBLIC = 1
    PRO = 2
    ADMIN = 3

    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]

    @classmethod
    def get_role(cls, role_id: int):
        for key in cls:
            if key.value == role_id:
                return key
        return None


class TicketCategory(IntEnum):
    PRO_VERIFICATION = 1

    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]

    @classmethod
    def get_category(cls, role_id: int):
        for key in cls:
            if key.value == role_id:
                return key
        return None


class TicketStatus(IntEnum):
    NEW = 1
    PENDING = 2
    RESPONSE = 3
    DONE = 4

    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]

    @classmethod
    def get_status(cls, role_id: int):
        for key in cls:
            if key.value == role_id:
                return key
        return None
