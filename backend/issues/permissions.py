from rest_framework import permissions
from rest_framework.permissions import BasePermission
from .models import User

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == User.ADMIN













    



