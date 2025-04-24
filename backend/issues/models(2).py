from django.db import models
from django.contrib.auth.models import AbstractUser

class Permission(models.Model):
    name = models.CharField(max_length=100, unique=True) 
    description = models.TextField()

    def __str__(self):
        return self.name

# Custom user model
class User(AbstractUser):
    is_student = models.BooleanField(default=False)
    is_registrar = models.BooleanField(default=False)
    department = models.ForeignKey('Department', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.username

class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Issue(models.Model):
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('assigned', 'Assigned'),
        ('resolved', 'Resolved'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='issues')
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    registrar = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_issues')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.status}"

class Student(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
        limit_choices_to={'user_type': 'student'}
    )
    student_id = models.CharField(max_length=20, unique=True)
    program = models.CharField(max_length=100)

class Lecturer(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
        limit_choices_to={'user_type': 'lecturer'}
    )
    staff_id = models.CharField(max_length=20, unique=True)
    department = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.username} ({self.staff_id})"
    
class Registrar(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
        limit_choices_to={'user_type': 'registrar'}
    )
    employee_id = models.CharField(max_length=20, unique=True)
    
    def __str__(self):
        return f"{self.user.username} ({self.employee_id})"

class Issue(models.Model):
    CATEGORY_CHOICES = [
        ('academic', 'Academic'),
        ('technical', 'Technical'),
        ('administrative', 'Administrative'),
    ]
    
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    course_code = models.CharField(max_length=20)
    description = models.TextField()
    document = models.FileField(upload_to='issue_documents/', blank=True, null=True)
    reporter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reported_issues')
    assigned_to = models.ForeignKey(Lecturer, on_delete=models.SET_NULL, related_name='assigned_issues', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, default='open', choices=[
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved')
    ])

    def __str__(self):
        return f"{self.category} - {self.course_code}"