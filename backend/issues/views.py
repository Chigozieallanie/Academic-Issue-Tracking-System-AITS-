from rest_framework import generics, status, viewsets
from .models import Issue, StudentProfile as Student, CustomUser, LecturerProfile
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import IssueSerializer
from django.contrib.auth import authenticate
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from .serializers import UserProfileSerializer,UserRegistrationSerializer, UserSerializer 
from django.contrib.auth import get_user_model
from .models import StudentProfile, LecturerProfile, RegistrarProfile
from django.contrib.auth import logout
from .serializers import (
    UserRegistrationSerializer,
    StudentProfileSerializer,
    LecturerProfileSerializer,
    RegistrarProfileSerializer,
    UserLoginSerializer
)
from rest_framework.pagination import PageNumberPagination
from .permissions import IsRole, IsOwnerOrReadOnly
from .models import Notification
from .serializers import NotificationSerializer
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.permissions import AllowAny

User = get_user_model()


class IsRegistrarRole(IsRole):
    allowed_roles = ['registrar']


class StudentProfileViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentProfileSerializer
    permission_classes = [IsRegistrarRole]

    def perform_create(self, serializer):
        if self.request.user.role == 'registrar':
            serializer.save()
        else:
            serializer.save(user=self.request.user)


class CustomPagination(PageNumberPagination):
    page_size = 10


class IssueListCreateView(generics.ListCreateAPIView):
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination

    def get_queryset(self):
        user = self.request.user
        if user.role == 'student':
            return Issue.objects.filter(owner=user)
        return Issue.objects.all()


class IssueRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        return Issue.objects.all()

    def perform_update(self, serializer):
        issue = self.get_object()
        # Before updating, send notification if the status is changed
        old_status = issue.status
        new_status = serializer.validated_data.get('status', issue.status)

        if old_status != new_status:
            self.send_status_update_email(issue, old_status, new_status)

        serializer.save()

    def send_status_update_email(self, issue, old_status, new_status):
        # Email notification logic here
        subject = f"Issue Status Updated: {issue.title}"
        message = f"The status of the issue '{issue.title}' has been updated from '{old_status}' to '{new_status}'."

        # Send email to the owner (Student)
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [issue.owner.email]
        )

        # Send email to the lecturer if available
        if issue.lecturer:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [issue.lecturer.user.email]
            )


class UserRegistrationView(generics.CreateAPIView):
    permission_classes = []  # Allow anyone to access
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserRegistrationSerializer
    def get(self, request):
        """Provide registration form information"""
        return Response({
            "message": "Send POST request with user data to register",
            "required_fields": {
                "username": "string",
                "email": "string",
                "password": "string",
                "password2": "string",
                "role": "student|lecturer|registrar",
                "first_name": "string",
                "last_name": "string"
            }
        })

    def post(self, request):
        """Handle user registration"""
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                return Response({
                    "status": "success",
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "role": user.role
                    }
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({
                    "status": "error",
                    "errors": str(e)
                }, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            "status": "error",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        # Validate the incoming data
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        # Get the validated user from the serializer
        user = serializer.validated_data['user']

        # Create the JWT token
        refresh = RefreshToken.for_user(user)

        # Access and refresh tokens
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        return Response({
            'access_token': access_token,
            'refresh_token': refresh_token,
            'user_id': user.pk,
            'username': user.username,
            'role': user.role
        }, status=status.HTTP_200_OK)


class UserLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response(
            status=status.HTTP_204_NO_CONTENT
        )


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)


class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = CustomPagination

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')
