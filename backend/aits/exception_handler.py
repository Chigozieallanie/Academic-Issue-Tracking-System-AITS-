from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError,PermissionDenied
from issues.exceptions import UnauthorizedAction,InvalidData

def custom_exception_handler(exc,context):
    response=exception_handler(exc,context)

    if response is None:
        response=Response({'message':'An unexpected error occured.Please try again later.'},
                          status=500
        )

    if isinstance(exc,UnauthorizedAction):
        response.data['message']=exc.default_detail
        response.data['status_code']=exc.status_code

    elif isinstance(exc,InvalidData):
        response.data['message']=exc.default_detail
        response.data['status_code']=exc.status_code  


    elif isinstance(exc,ValidationError):
        response.data['message']='There were errors with the data you provided.Please check the details and try again.'
        response.data['status_code']=400


    elif isinstance(exc,PermissionDenied):
        response.data['message']='You do not have permission to perform this action.'
        response.data['status_code']=403

    return response