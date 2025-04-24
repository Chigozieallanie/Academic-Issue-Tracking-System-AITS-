from functools import wraps
from rest_framework.response import Response
from rest_framework import status

def role_required(roles):
    """
    Decorator to check if user has the required role(s)
    
    Usage:
    @role_required(['student', 'lecturer'])
    def my_view(request):
        ...
    """
    def decorator(view_func):
        @wraps(view_func)
        def wrapped_view(request, *args, **kwargs):
            if not request.user.is_authenticated:
                return Response(
                    {'error': 'Authentication required'},
                    status=status.HTTP_401_UNAUTHORIZED
                )
                
            if request.user.role not in roles:
                return Response(
                    {'error': 'Permission denied'},
                    status=status.HTTP_403_FORBIDDEN
                )
            return view_func(request, *args, **kwargs)
        return wrapped_view
    return decorator