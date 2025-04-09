from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth import authenticate
from .models import (
    Issue,
    CustomUser,
    StudentProfile,
    LecturerProfile,
    RegistrarProfile,  # or AcademicRegistrar if that’s your model name
    Course,
    Enrollment,
    Mentorship,
    Comment,
    CourseMaterial,
    Attendance
)

User = get_user_model()

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'


class UserRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)
    role = serializers.ChoiceField(choices=CustomUser.USER_ROLE_CHOICES)

    # Student fields (only required if role=student)
    student_id = serializers.CharField(required=False, allow_blank=True)
    program = serializers.CharField(required=False, allow_blank=True)
    year_of_study = serializers.IntegerField(
        required=False,
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )

    # Lecturer fields (only required if role=lecturer)
    staff_id = serializers.CharField(required=False, allow_blank=True)
    department = serializers.CharField(required=False, allow_blank=True)
    specialization = serializers.CharField(required=False, allow_blank=True)

    # Registrar fields (only required if role=registrar)
    office = serializers.CharField(required=False, allow_blank=True)
    contact_info = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = CustomUser
        fields = [
            'username', 'email', 'password', 'password2', 'role',
            'first_name', 'last_name',
            'student_id', 'program', 'year_of_study',  # Student
            'staff_id', 'department', 'specialization',  # Lecturer
            'office', 'contact_info'  # Registrar
        ]

    def validate(self, attrs):
        # Password match validation
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match."})

        # Role-specific field validation
        role = attrs['role']
        if role == CustomUser.STUDENT:
            if not all([attrs.get('student_id'), attrs.get('program'), attrs.get('year_of_study')]):
                raise serializers.ValidationError(
                    "Student ID, program, and year of study are required for students."
                )
        elif role == CustomUser.LECTURER:
            if not all([attrs.get('staff_id'), attrs.get('department'), attrs.get('specialization')]):
                raise serializers.ValidationError(
                    "Staff ID, department, and specialization are required for lecturers."
                )
        elif role == CustomUser.REGISTRAR:
            if not all([attrs.get('office'), attrs.get('contact_info')]):
                raise serializers.ValidationError(
                    "Office and contact info are required for registrars."
                )
        return attrs

    def create(self, validated_data):
        # Step 1: Extract profile data
        role = validated_data.pop('role')
        profile_data = {}
        
        if role == CustomUser.STUDENT:
            profile_data = {
                'student_id': validated_data.pop('student_id'),
                'program': validated_data.pop('program'),
                'year_of_study': validated_data.pop('year_of_study')
            }
        elif role == CustomUser.LECTURER:
            profile_data = {
                'staff_id': validated_data.pop('staff_id'),
                'department': validated_data.pop('department'),
                'specialization': validated_data.pop('specialization')
            }
        elif role == CustomUser.REGISTRAR:
            profile_data = {
                'office': validated_data.pop('office'),
                'contact_info': validated_data.pop('contact_info')
            }

        # Step 2: Create user (ONLY with core fields)
        password = validated_data.pop('password')
        validated_data.pop('password2')  # Remove unused field
        
        user = CustomUser.objects.create(**validated_data, role=role)
        user.set_password(password)
        user.save()

        # Step 3: Create profile
        if role == CustomUser.STUDENT:
            StudentProfile.objects.create(user=user, **profile_data)
        elif role == CustomUser.LECTURER:
            LecturerProfile.objects.create(user=user, **profile_data)
        elif role == CustomUser.REGISTRAR:
            RegistrarProfile.objects.create(user=user, **profile_data)

        # Step 4: Generate token (optional)
        Token.objects.create(user=user)
        return user
    
    
class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = ('student_id', 'program', 'year_of_study')


class LecturerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = LecturerProfile
        fields = ('staff_id', 'department', 'specialization')

class RegistrarProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistrarProfile # or RegistrarProfile if that’s your model name   
        fields = ('office', 'contact_info')


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(request=self.context.get('request'),
                                username=username,
                                password=password)
            if not user:
                raise serializers.ValidationError("Unable to log in with provided credentials.")
        else:
            raise serializers.ValidationError("Must include 'username' and 'password'.")

        attrs['user'] = user
        return attrs
    

class UserProfileSerializer(serializers.ModelSerializer):
    role_data = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role', 'email_verified', 'requires_profile_setup', 'role_data']

    def get_role_data(self, user):
        return user.get_role_data()  # This uses your existing `get_role_data()` method