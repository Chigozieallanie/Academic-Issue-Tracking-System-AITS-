from rest_framework import permissions
from rest_framework.permissions import BasePermission
from .models import User

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == User.ADMIN

class IsAcademicRegistrar(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == User.ACADEMIC_REGISTRAR

class IsLecturer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == User.LECTURER







    



