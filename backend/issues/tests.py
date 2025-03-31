from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Issue, Department


class IssueTests(APITestCase):
    def setUp(self):
        self.student_user = get_user_model().objects.create_user(
            username='student', password='password', role='student'
        )
        self.lecturer_user = get_user_model().objects.create_user(
            username='lecturer', password='password', role='lecturer'
        )
        self.registrar_user = get_user_model().objects.create_user(
            username='registrar', password='password', role='registrar'
        )
        self.department = Department.objects.create(name="Computer Science")

        
        self.student_token = str(RefreshToken.for_user(self.student_user).access_token)
        self.lecturer_token = str(RefreshToken.for_user(self.lecturer_user).access_token)

        
        self.issue = Issue.objects.create(
            title='Test Issue',
            description='Description of the test issue.',
            status='open',
            student=self.student_user,
            department=self.department
        )

    def test_unauthenticated_user_cannot_create_issue(self):
        self.client.credentials()  
        data = {'title': 'Unauthorized Issue', 'description': 'This should not be allowed.'}
        response = self.client.post('/api/issues/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_student_can_create_issue(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.student_token}')
        data = {
            'title': 'New Student Issue',
            'description': 'Description of new student issue',
            'status': 'open',
            'course': 'CS101',
            'student': self.student_user.id,
            'department': self.department.id
        }
        response = self.client.post('/api/issues/', data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], data['title'])

    def test_student_cannot_update_issue_status(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.student_token}')
        data = {'status': 'resolved'}
        response = self.client.patch(f'/api/issues/{self.issue.id}/status/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_lecturer_can_update_issue_status(self):
        self.issue.assigned_lecturer = self.lecturer_user
        self.issue.save()
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.lecturer_token}')
        data = {'status': 'resolved'}
        response = self.client.patch(f'/api/issues/{self.issue.id}/status/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'resolved')