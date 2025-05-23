


from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Issue, Comment, Notification

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 'role', 'phone_number', 'student_number', 'college')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get['email', ''],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role=validated_data.get('role', User.STUDENT),
            phone_number=validated_data.get('phone_number', ''),
            student_number=validated_data.get('student_number', None),
            college=validated_data.get('college', None)
        )
        return user
    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'role', 'phone_number', 'student_number', 'college')
        read_only_fields = ('id', 'username', 'role')

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'role', 'phone_number', 'student_number', 'college')
        read_only_fields = ('id', 'username', 'role')

class UserListSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'phone_number', 'student_number', 'college', 'full_name')

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip()
    
class IssueSerializer(serializers.ModelSerializer):
    created_by_name = serializers.SerializerMethodField()
    assigned_to_name = serializers.SerializerMethodField()

    class Meta:
        model = Issue
        fields = ('id', 'title', 'description', 'status', 'priority', 'created_by', 
                  'created_by_name', 'assigned_to', 'assigned_to_name', 'created_at', 
                  'updated_at', 'course_unit', 'college')
        read_only_fields = ('created_by', 'created_at', 'updated_at')

    def get_created_by_name(self, obj):
        if obj.created_by:
            return f"{obj.created_by.first_name} {obj.created_by.last_name}".strip()
        return None
    
    def get_assigned_to_name(self, obj):
        if obj.assigned_to:
            return f"{obj.assigned_to.first_name} {obj.assigned_to.last_name}".strip()
        return None
    
    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        
        # If college is not provided, use the user's college
        if 'college' not in validated_data:
            validated_data['college'] = self.context['request'].user.college

        issue = Issue.objects.create(**validated_data)
        
        # Create notification for the assigned user if any
        if issue.assigned_to:
            Notification.objects.create(
                user=issue.assigned_to,
                notification_type=Notification.ISSUE_CREATED,
                issue=issue,
                message=f"New issue '{issue.title}' has been assigned to you"
            )

        # Create notification for academic registrars
        for registrar in User.objects.filter(role=User.ACADEMIC_REGISTRAR):
            Notification.objects.create(
                user=registrar,
                notification_type=Notification.ISSUE_CREATED,
                issue=issue,
                message=f"New issue '{issue.title}' has been created by {issue.created_by.get_full_name()}"
            )
        
        return issue

    def update(self, instance, validated_data):
        old_status = instance.status
        old_assigned_to = instance.assigned_to

        # Update the instance
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()

        # Create notifications for status changes
        if 'status' in validated_data and old_status != instance.status:
            # Notify the creator
            Notification.objects.create(
                user=instance.created_by,
                notification_type=Notification.STATUS_CHANGED,
                issue=instance,
                message=f"Status of your issue '{instance.title}' has been changed to {instance.get_status_display()}"
            )

            # Notify the assigned user if any
            if instance.assigned_to and instance.assigned_to != instance.created_by:
                Notification.objects.create(
                    user=instance.assigned_to,
                    notification_type=Notification.STATUS_CHANGED,
                    issue=instance,
                    message=f"Status of issue '{instance.title}' has been changed to {instance.get_status_display()}"
                )

        # Create notifications for assignment changes
        if 'assigned_to' in validated_data and old_assigned_to != instance.assigned_to:
            if instance.assigned_to:
                Notification.objects.create(
                    user=instance.assigned_to,
                    notification_type=Notification.ASSIGNED,
                    issue=instance,
                    message=f"Issue '{instance.title}' has been assigned to you"
                )
            
            # Notify the creator if they're not the one making the change
            if instance.created_by != self.context['request'].user:
                Notification.objects.create(
                    user=instance.created_by,
                    notification_type=Notification.ISSUE_UPDATED,
                    issue=instance,
                    message=f"Your issue '{instance.title}' has been assigned to {instance.assigned_to.get_full_name() if instance.assigned_to else 'no one'}"
                )
        
        return instance

class CommentSerializer(serializers.ModelSerializer):
    created_by_name = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('id', 'issue', 'content', 'created_by', 'created_by_name', 'created_at')
        read_only_fields = ('created_by', 'created_at')
    
    def get_created_by_name(self, obj):
        if obj.created_by:
            return f"{obj.created_by.first_name} {obj.created_by.last_name}".strip()
        return None
    
    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        comment = Comment.objects.create(**validated_data)
        
        # Create notification for the issue creator
        issue = comment.issue
        if issue.created_by != self.context['request'].user:
            Notification.objects.create(
                user=issue.created_by,
                notification_type=Notification.COMMENT_ADDED,
                issue=issue,
                message=f"New comment on your issue '{issue.title}'"
            )

        return comment
    
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('id', 'user', 'notification_type', 'issue', 'message', 'is_read', 'created_at')
        read_only_fields = ('user', 'notification_type', 'issue', 'message', 'created_at')













User = get_user_model()

from rest_framework import serializers
from .models import User, Issue

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'is_student', 'is_registrar', 'department']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['permissions'] = list(self.user.permissions.values_list('name', flat=True))
        return data


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







