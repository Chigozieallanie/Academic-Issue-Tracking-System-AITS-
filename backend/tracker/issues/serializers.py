from rest_framework import serializers
from .models import Issue,CustomUser,Student,Lecturer,AcademicRegistrar,Course,Enrollment,Mentorship,Comment,CourseMaterial,Attendance
from rest_framework.authtoken.models import Token

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role']

class StudentProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Student
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = CustomUser.objects.create(**user_data)
        return Student.objects.create(user=user, **validated_data)
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            user = instance.user
            user.username = user_data.get('username', user.username)
            user.email = user_data.get('email', user.email)
            user.save()
        return super().update(instance, validated_data)
    
class LecturerProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Lecturer
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = CustomUser.objects.create(**user_data)
        return Lecturer.objects.create(user=user, **validated_data)
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            user = instance.user
            user.username = user_data.get('username', user.username)
            user.email = user_data.get('email', user.email)
            user.save()
        return super().update(instance, validated_data)
    
class AcademicRegistrarProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = AcademicRegistrar
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = CustomUser.objects.create(**user_data)
        return AcademicRegistrar.objects.create(user=user, **validated_data)
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            user = instance.user
            user.username = user_data.get('username', user.username)
            user.email = user_data.get('email', user.email)
            user.save()
        return super().update(instance, validated_data)
    
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id','username','email','password']
    
    def validate(self, attrs):
        email = attrs.get('email', '')
        if not len(email):
            raise serializers.ValidationError({'email':('Email is required')})
        return attrs
    
    def create(self, validated_data):
        user = CustomUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=255, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        user = CustomUser.objects.filter(username=username).first()
        if user is None:
            raise serializers.ValidationError({'username': 'User not found'})
        
        if not user.check_password(password):
            raise serializers.ValidationError({'password': 'Incorrect password'})
        
        token = Token.objects.get(user=user)

        return {
            'token': token.key
        }
    