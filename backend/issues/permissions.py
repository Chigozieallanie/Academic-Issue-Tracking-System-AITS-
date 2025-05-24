from rest_framework import permissions
from rest_framework.permissions import BasePermission
from .models import User

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == User.ADMIN













    

class IsLecturerRole():
    allowed_roles = ['lecturer']

class IsStudentRole():
    allowed_roles = ['student']

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    Also allows lecturers to update the status of issues assigned to them.
    """
    def has_object_permission(self, request, view, obj):
        print(f"User: {request.user}, Object Owner: {obj.owner}")  # Debugging user and owner

        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions for the student who created the issue
        if obj.owner == request.user:
            return True

        # Allow lecturers to update the status of issues assigned to them
        if request.user.is_authenticated and request.user.role == 'lecturer' and obj.lecturer == request.user:
            if request.method in ['PUT', 'PATCH']:
                allowed_fields = {'status'}
                incoming_fields = set(request.data.keys())
                return incoming_fields.issubset(allowed_fields)

        return False
