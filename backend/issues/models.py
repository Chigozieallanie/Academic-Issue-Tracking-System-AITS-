from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.conf import settings



class Issue(models.Model):
    CATEGORY_CHOICES = [
        ('academic', 'Academic'),
        ('administrative', 'Administrative'),
        ('technical', 'Technical'),
        ('other', 'Other'),
    ]

    STATUS_CHOICES = [
        ('open', 'Open'),
        ('pending', 'Pending'),
        ('assigned', 'Assigned'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
    ]


    owner = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,default=1)
    title = models.CharField(max_length=255, default="Default Title")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='academic')
    lecturer = models.CharField(max_length=50)
    coursecode = models.CharField(max_length=20)
    description = models.TextField()
    document = models.FileField(upload_to='issue_documents/', blank=True, null=True)
    status = models.CharField(max_length=10,choices=STATUS_CHOICES,default='open',  )
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_issues'
    )
            
    def __str__(self):
        return self.title


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












class StudentProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student_profile')
    student_id = models.CharField(max_length=20)
    program = models.CharField(max_length=100)
    year_of_study = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.user.username} - Student"

class LecturerProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='lecturer_profile')
    staff_id = models.CharField(max_length=20)
    department = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.username} - Lecturer"

class RegistrarProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='registrar_profile')
    office = models.CharField(max_length=100)
    contact_info = models.TextField()

    def __str__(self):
        return f"{self.user.username} - Registrar"
    
    
class Course(models.Model):
    title = models.CharField(max_length=200)
    lecturer = models.ForeignKey('issues.LecturerProfile', on_delete=models.CASCADE)
    students = models.ManyToManyField('issues.StudentProfile', related_name='courses')

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

