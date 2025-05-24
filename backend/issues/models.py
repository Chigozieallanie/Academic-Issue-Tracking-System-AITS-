from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.conf import settings

def get_default_user():
    return User.objects.first().id 




class User(AbstractUser):
    STUDENT = 'student'
    LECTURER = 'lecturer'
    ACADEMIC_REGISTRAR = 'academic_registrar'
    ADMIN = 'admin'

    ROLE_CHOICES = [
        (STUDENT, 'Student'),
        (LECTURER, 'Lecturer'),
        (ACADEMIC_REGISTRAR, 'Academic Registrar'),
        (ADMIN, 'Admin'),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=STUDENT)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    
    
    student_number = models.CharField(max_length=20, blank=True, null=True, unique=True, default=None)
    college = models.CharField(max_length=100, blank=True, null=True)

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()



class Issue(models.Model):
    PENDING = 'pending'
    IN_PROGRESS = 'in_progress'
    RESOLVED = 'resolved'
    CLOSED = 'closed'
    
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (IN_PROGRESS, 'In Progress'),
        (RESOLVED, 'Resolved'),
        (CLOSED, 'Closed'),
    ]
    
    LOW = 'low'
    MEDIUM = 'medium'
    HIGH = 'high'
    
    PRIORITY_CHOICES = [
        (LOW, 'Low'),
        (MEDIUM, 'Medium'),
        (HIGH, 'High'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=PENDING)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default=MEDIUM)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_issues')
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_issues')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    course_unit = models.CharField(max_length=100, blank=True, null=True)
    college = models.CharField(max_length=100, blank=True, null=True)
    
    def __str__(self):
        return self.title
    
    def get_status_display(self):
        return dict(self.STATUS_CHOICES).get(self.status, self.status)





    

class Comment(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey('issues.CustomUser', on_delete=models.CASCADE)
    issue = models.ForeignKey('Issue', on_delete=models.CASCADE, related_name='comments')


class CourseMaterial(models.Model):
    title = models.CharField(max_length=200)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    file = models.FileField(upload_to='course_materials/')
    uploaded_by = models.ForeignKey('issues.LecturerProfile', on_delete=models.CASCADE)


class Attendance(models.Model):
    student = models.ForeignKey('issues.StudentProfile', on_delete=models.CASCADE)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    date = models.DateField()
    present = models.BooleanField(default=False)




User = get_user_model()

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    message = models.CharField(max_length=255)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.user.username}: {self.message}"

