from rest_framework import generics, status, viewsets
from .models import Issue, Student, CustomUser
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import IssueSerializer
# from .permissions import IsOwnerOrReadOnly, IsRole
from rest_framework import status, permissions
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken # type: ignore
from django.contrib.auth import authenticate, login, logout
from .models import Student, Lecturer, AcademicRegistrar
from .serializers import (
    UserRegistrationSerializer,
    StudentProfileSerializer,
    LecturerProfileSerializer,
    RegistrarProfileSerializer,
    UserLoginSerializer
)


User = get_user_model()


class StudentProfileViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentProfileSerializer
    permission_classes = [AllowAny] #[IsOwnerOrReadOnly | IsRole(['registrar'])]

    def perform_create(self, serializer):
        if self.request.user.role == 'registrar':
            serializer.save()
        else:
            serializer.save(user=self.request.user)

class IssueListCreateView(generics.ListCreateAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [AllowAny]  # This allows unauthenticated access


class IssueRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer


class UserRegistrationView(APIView):
    permission_classes = []  # Allow anyone to access
    
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
            user = serializer.save()
            return Response({
                "status": "success",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "role": user.role
                }
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            "status": "error",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    

class UserLoginView(APIView):
    permission_classes = []  # Allow unauthenticated access
    
    def get(self, request):
        """Provide login endpoint information"""
        return Response({
            "message": "Send POST request with credentials to login",
            "required_fields": {
                "username": "string",
                "password": "string"
            },
            "success_response": {
                "refresh": "JWT refresh token",
                "access": "JWT access token",
                "user": {
                    "id": "integer",
                    "username": "string",
                    "email": "string",
                    "role": "string"
                }
            }
        })
    
    def post(self, request):
        """Handle user login"""
        serializer = UserLoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                "status": "error",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        user = authenticate(username=username, password=password)
        
        if not user:
            return Response({
                "status": "error",
                "message": "Invalid credentials"
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        refresh = RefreshToken.for_user(user)
        return Response({
            "status": "success",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role
            }
        })

class UserLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        logout(request)
        return Response(
            {'message': 'Successfully logged out'},
            status=status.HTTP_200_OK
        )