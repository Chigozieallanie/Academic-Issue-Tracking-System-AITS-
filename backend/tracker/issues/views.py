from tokenize import Token
from rest_framework import generics, status, viewsets
from .models import Issue, StudentProfile as Student, CustomUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import IssueSerializer
from django.contrib.auth import authenticate
# from .permissions import IsOwnerOrReadOnly, IsRole
from rest_framework import status, permissions
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from .serializers import UserProfileSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken # type: ignore
from django.contrib.auth import authenticate, login, logout
from .models import StudentProfile, LecturerProfile, RegistrarProfile
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
    serializer_class = UserLoginSerializer
    permission_classes = []

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
            {'message': 'Successfully logged out'},
            status=status.HTTP_200_OK
        )
        

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)