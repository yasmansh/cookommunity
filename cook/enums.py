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


