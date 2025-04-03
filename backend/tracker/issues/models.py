from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

class Issue(models.Model):
    CATEGORY_CHOICES = [
        ('academic', 'Academic'),
        ('administrative', 'Administrative'),
        ('technical', 'Technical'),
        ('other', 'Other'),
    ]
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='academic')
    lecturer = models.CharField(max_length=50)
    coursecode = models.CharField(max_length=20)
    description = models.TextField()
    document = models.FileField(upload_to='issue_documents/', blank=True, null=True)
    
            
    def __str__(self):
        return self.title

class CustomUser(AbstractUser):
    STUDENT = 'student'
    LECTURER = 'lecturer'
    REGISTRAR = 'registrar'
    
    USER_ROLE_CHOICES = [
        (STUDENT, 'Student'),
        (LECTURER, 'Lecturer'),
        (REGISTRAR, 'Academic Registrar'),
    ]
    
    role = models.CharField(max_length=10, choices=USER_ROLE_CHOICES, default=STUDENT)
    email_verified = models.BooleanField(default=False)
    requires_profile_setup = models.BooleanField(default=True)
    
    def __str__(self):
        return self.username

class Student(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='student_profile')
    student_id = models.CharField(max_length=20, unique=True)
    program = models.CharField(max_length=100)
    year_of_study = models.IntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5)
        ]
    )
    
    def __str__(self):
        return f"{self.user.username} - {self.student_id}"

class Lecturer(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='lecturer_profile')
    staff_id = models.CharField(max_length=20, unique=True)
    department = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.user.username} - {self.staff_id}"

class AcademicRegistrar(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='registrar_profile')
    office = models.CharField(max_length=100)
    contact_info = models.CharField(max_length=100)
    managed_students = models.ManyToManyField(Student, related_name='registrars', blank=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.office}"
class Course(models.Model):
        title = models.CharField(max_length=200)
        lecturer = models.ForeignKey('Lecturer', on_delete=models.CASCADE)
        students = models.ManyToManyField('Student', related_name='courses')

class Enrollment(models.Model):
        student = models.ForeignKey('Student', on_delete=models.CASCADE)
        course = models.ForeignKey('Course', on_delete=models.CASCADE)
        semester = models.CharField(max_length=20)
        grade = models.CharField(max_length=10, blank=True, null=True)

class Mentorship(models.Model):
        mentor = models.ForeignKey('Lecturer', on_delete=models.CASCADE)
        mentee = models.ForeignKey('Student', on_delete=models.CASCADE)
        start_date = models.DateField()
        end_date = models.DateField(blank=True, null=True)
        status = models.CharField(max_length=10, default='active')

class Comment(models.Model):
        content = models.TextField()
        created_at = models.DateTimeField(auto_now_add=True)
        updated_at = models.DateTimeField(auto_now=True)
        author = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
        issue = models.ForeignKey('Issue', on_delete=models.CASCADE, related_name='comments')

class CourseMaterial(models.Model):
        title = models.CharField(max_length=200)
        course = models.ForeignKey('Course', on_delete=models.CASCADE)
        file = models.FileField(upload_to='course_materials/')
        uploaded_by = models.ForeignKey('Lecturer', on_delete=models.CASCADE)

class Attendance(models.Model):
        student = models.ForeignKey('Student', on_delete=models.CASCADE)
        course = models.ForeignKey('Course', on_delete=models.CASCADE)
        date = models.DateField()
        present = models.BooleanField(default=False)
