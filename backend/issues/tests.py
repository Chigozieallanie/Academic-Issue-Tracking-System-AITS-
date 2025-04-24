from django.test import TestCase
from rest_framework.test import APIRequestFactory
from issues.permissions import IsRole, IsOwnerOrReadOnly
from issues.models import CustomUser, Issue
from rest_framework.test import APITestCase
from rest_framework import status
from django.test import override_settings
from rest_framework.test import APIClient

@override_settings(AUTHENTICATION_BACKENDS=['django.contrib.auth.backends.ModelBackend'])
class IssuePermissionTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user1 = CustomUser.objects.create_user(username='user1', email='user1@example.com', password='password')
        self.user2 = CustomUser.objects.create_user(username='user2', email='user2@example.com', password='password')
        self.issue = Issue.objects.create(owner=self.user1, title='Test Issue', category='academic')
        print(f"Created Issue ID: {self.issue.id}")  # Debugging the Issue ID
        self.client.force_authenticate(user=self.user1)  # Authenticate as user1

    def test_owner_can_update_issue(self):
        url = f'/api/issues/{self.issue.id}/'
        print(f"Testing URL: {url}")  # Debugging URL
        data = {
            'title': 'Updated Title',
            'category': self.issue.category,
            'lecturer': 'Test Lecturer',
            'coursecode': 'TEST123',
            'description': 'Updated issue description'
        }
        response = self.client.put(url, data, format='json')
        print(f"Response Status Code: {response.status_code}")  # Debugging response
        print(f"Response Data: {response.data}")  # Debugging response data
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_non_owner_cannot_update_issue(self):
        self.client.force_authenticate(user=self.user2)  # Authenticate as user2
        url = f'/api/issues/{self.issue.id}/'
        print(f"Testing URL: {url}")  # Debugging URL
        data = {
            'title': 'Updated Title',
            'category': self.issue.category,
            'lecturer': 'Test Lecturer',
            'coursecode': 'TEST123',
            'description': 'Updated issue description'
        }
        response = self.client.put(url, data, format='json')
        print(f"Response Status Code: {response.status_code}")  # Debugging response
        print(f"Response Data: {response.data}")  # Debugging response data
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_owner_can_delete_issue(self):
        url = f'/api/issues/{self.issue.id}/'
        print(f"Testing URL: {url}")  # Debugging URL
        response = self.client.delete(url)
        print(f"Response Status Code: {response.status_code}")  # Debugging response
        print(f"Response Data: {response.data}")  # Debugging response data
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_non_owner_cannot_delete_issue(self):
        self.client.force_authenticate(user=self.user2)  # Authenticate as user2
        url = f'/api/issues/{self.issue.id}/'
        print(f"Testing URL: {url}")  # Debugging URL
        response = self.client.delete(url)
        print(f"Response Status Code: {response.status_code}")  # Debugging response
        print(f"Response Data: {response.data}")  # Debugging response data
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


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
        self.issue = Issue.objects.create(owner=self.owner_user, title='Test Issue')

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
