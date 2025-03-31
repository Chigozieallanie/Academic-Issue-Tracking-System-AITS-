from rest_framework.exceptions import APIException

class UnauthorizedAction(APIException):
    status_code=403
    default_detail='You do not have permission to perform this action.'
    default_code='unauthorized_action'


class InvalidData(APIException):
    status_code=400
    default_detail='The data you provided is invalid or incomplete.'
    default_code='invalid_data'
