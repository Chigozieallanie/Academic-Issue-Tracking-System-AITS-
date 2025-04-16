from django.test import TestCase
from rest_framework.test import APIRequestFactory
from issues.permissions import IsRole, IsOwnerOrReadOnly
from issues.models import CustomUser, Issue

class IsRolePermissionTest(TestCase):
    """
    Unit tests for the IsRole permission.
    """
    def setUp(self):
        self.factory = APIRequestFactory()
        self.registrar_user = CustomUser.objects.create_user(
            username='registrar_user', email='registrar@example.com', role='registrar'
        )
        self.student_user = CustomUser.objects.create_user(
            username='student_user', email='student@example.com', role='student'
        )

    def test_is_role_permission_granted(self):
        """
        Test that a user with the correct role is granted permission.
        """
        request = self.factory.get('/')
        request.user = self.registrar_user
        permission = IsRole()
        permission.allowed_roles = ['registrar']
        self.assertTrue(permission.has_permission(request, None))

    def test_is_role_permission_denied(self):
        """
        Test that a user without the correct role is denied permission.
        """
        request = self.factory.get('/')
        request.user = self.student_user
        permission = IsRole()
        permission.allowed_roles = ['registrar']
        self.assertFalse(permission.has_permission(request, None))


class IsOwnerOrReadOnlyPermissionTest(TestCase):
    """
    Unit tests for the IsOwnerOrReadOnly permission.
    """
    def setUp(self):
        self.factory = APIRequestFactory()
        self.owner_user = CustomUser.objects.create_user(
            username='owner_user', email='owner@example.com'
        )
        self.other_user = CustomUser.objects.create_user(
            username='other_user', email='other@example.com'
        )
        self.issue = Issue.objects.create(user=self.owner_user, title='Test Issue')

    def test_owner_has_permission(self):
        """
        Test that the owner of the object has full permission.
        """
        request = self.factory.get('/')
        request.user = self.owner_user
        permission = IsOwnerOrReadOnly()
        self.assertTrue(permission.has_object_permission(request, None, self.issue))

    def test_non_owner_has_read_only_permission(self):
        """
        Test that a non-owner has read-only permission.
        """
        request = self.factory.get('/')
        request.user = self.other_user
        permission = IsOwnerOrReadOnly()
        self.assertTrue(permission.has_object_permission(request, None, self.issue))

    def test_non_owner_has_no_write_permission(self):
        """
        Test that a non-owner cannot write to the object.
        """
        request = self.factory.post('/')
        request.user = self.other_user
        permission = IsOwnerOrReadOnly()
        self.assertFalse(permission.has_object_permission(request, None, self.issue))