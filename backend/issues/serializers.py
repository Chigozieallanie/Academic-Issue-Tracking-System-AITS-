from rest_framework import generics, status, viewsets
from .models import Issue, StudentProfile as Student, CustomUser, LecturerProfile
from rest_framework.response import Response
from rest_framework.views import APIView
#from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import StudentProfile, LecturerProfile, RegistrarProfile
from django.contrib.auth import logout
from rest_framework.pagination import PageNumberPagination
from .permissions import IsRole, IsOwnerOrReadOnly
from .models import Notification
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.core.validators import MinValueValidator, MaxValueValidator
from .models import (
    Issue,
    CustomUser,
    StudentProfile,
    LecturerProfile,
    RegistrarProfile,
    Course,
    Enrollment,
    Mentorship,
    Comment,
    CourseMaterial,
    Attendance
)



User = get_user_model()

from rest_framework import serializers
from .models import User, Department, Issue

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'is_student', 'is_registrar', 'department']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['permissions'] = list(self.user.permissions.values_list('name', flat=True))
        return data

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue  
        fields = ['id', 'title', 'description', 'status', 'owner', 'lecturer', 'created_at', 'updated_at']

    def validate(self, attrs):
        # Validate status
        if 'status' in attrs and attrs['status'] not in ['open', 'pending', 'assigned', 'resolved', 'closed']:
            raise serializers.ValidationError({"status": "Invalid status."})

        # Validate title - ensure it's not empty and has a minimum length
        if 'title' in attrs and len(attrs['title']) < 5:
            raise serializers.ValidationError({"title": "Title must be at least 5 characters long."})

        # Validate description - ensure it's not empty
        if 'description' in attrs and len(attrs['description']) < 10:
            raise serializers.ValidationError({"description": "Description must be at least 10 characters long."})

        # Validate owner - ensure the owner is not null or invalid
        if 'owner' in attrs and not attrs['owner']:
            raise serializers.ValidationError({"owner": "Owner must be provided."})

        # Validate lecturer - ensure the lecturer is assigned when status is 'assigned'
        if 'lecturer' in attrs and attrs.get('status') == 'assigned' and not attrs['lecturer']:
            raise serializers.ValidationError({"lecturer": "Lecturer must be assigned if status is 'assigned'."})

        return attrs

    # Additional field-specific validation can also be added if needed
    def validate_status(self, value):
        if value not in ['open', 'pending', 'assigned', 'resolved', 'closed']:
            raise serializers.ValidationError("Invalid status.")
        return value

    def validate_title(self, value):
        if len(value) < 5:
            raise serializers.ValidationError("Title must be at least 5 characters long.")
        return value

    def validate_description(self, value):
        if len(value) < 10:
            raise serializers.ValidationError("Description must be at least 10 characters long.")
        return value

class IsRegistrarRole(IsRole):
    allowed_roles = ['registrar']

class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = '__all__'  



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

class LecturerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = LecturerProfile  
        fields = '__all__'

    def get_issues(self, obj):
        from .serializers import IssueSerializer  # local import to avoid circular import issues
        issues = Issue.objects.filter(lecturer=obj)
        return IssueSerializer(issues, many=True).data







class RegistrarProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistrarProfile 
        fields = '__all__'


class IssueListCreateView(generics.ListCreateAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination


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
                [issue.lecturer.email]
            )



class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'role', 'first_name', 'last_name']
    
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')

        if password != password2:
            raise serializers.ValidationError("Passwords must match.")

        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user



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
    


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    user = serializers.CharField(read_only=True)  # Add read-only user field for easier response
    
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if not username or not password:
            raise serializers.ValidationError('Both username and password are required.')

        user = authenticate(username=username, password=password)

        if not user:
            raise serializers.ValidationError('Invalid credentials.')

        attrs['user'] = user
        return attrs


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
            status=status.HTTP_204_NO_CONTENT 
        )
    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name']



class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)
    

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification  
        fields = '__all__'  



class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = CustomPagination  

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'user_type')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password'],
            user_type=validated_data['user_type']
        )
        return user