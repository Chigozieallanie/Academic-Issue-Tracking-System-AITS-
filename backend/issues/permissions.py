from rest_framework import permissions
from rest_framework.permissions import BasePermission

class HasPermission(BasePermission):
    def has_permission(self, request, view):
        required_permission = getattr(view, 'required_permission', None)
        if not required_permission:
            return False
        return request.user.permissions.filter(name=required_permission).exists()
    
class IsRole(permissions.BasePermission):
    """
    Custom base permission class to handle role-based permission checks.
    Subclass this for each role-based permission.
    """
    allowed_roles = []

    def has_permission(self, request, view):
        # Check if the user's role is in the allowed roles
        return request.user.is_authenticated and request.user.role in self.allowed_roles

class IsRegistrarRole(IsRole):
    allowed_roles = ['registrar']

class IsLecturerRole(IsRole):
    allowed_roles = ['lecturer']

class IsStudentRole(IsRole):
    allowed_roles = ['student']

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        print(f"User: {request.user}, Object Owner: {obj.owner}")  # Debugging user and owner
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the object
        return obj.owner == request.user
