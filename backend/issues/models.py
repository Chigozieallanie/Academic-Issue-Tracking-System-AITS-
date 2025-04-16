from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings
# from .models import Issue, StudentProfile as Student, CustomUser

class Issue(models.Model):
    CATEGORY_CHOICES = [
        ('academic', 'Academic'),
        ('administrative', 'Administrative'),
        ('technical', 'Technical'),
        ('other', 'Other'),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, default="Default Title")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='academic')
    lecturer = models.CharField(max_length=50)
    coursecode = models.CharField(max_length=20)
    description = models.TextField()
    document = models.FileField(upload_to='issue_documents/', blank=True, null=True)
    
            
    def __str__(self):
        return self.title

class CustomUser(AbstractUser):
    # Role Choices
    STUDENT = 'student'
    LECTURER = 'lecturer'
    REGISTRAR = 'registrar'
    
    USER_ROLE_CHOICES = [
        (STUDENT, 'Student'),
        (LECTURER, 'Lecturer'),
        (REGISTRAR, 'Academic Registrar'),
    ]
    
    # Core Fields
    role = models.CharField(max_length=10, choices=USER_ROLE_CHOICES, default=STUDENT)
    email_verified = models.BooleanField(default=False)
    requires_profile_setup = models.BooleanField(default=True)
    
    # Add unique email constraint
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username

    # ---- Role-Specific Property Accessors ----
    @property
    def student_profile(self):
        """Returns the Student profile if user is a student, else None."""
        if hasattr(self, '_student_profile'):
            return self._student_profile
        if self.role == self.STUDENT:
            self._student_profile = getattr(self, 'student_profile', None)
            return self._student_profile
        return None

    @property
    def lecturer_profile(self):
        """Returns the Lecturer profile if user is a lecturer, else None."""
        if hasattr(self, '_lecturer_profile'):
            return self._lecturer_profile
        if self.role == self.LECTURER:
            self._lecturer_profile = getattr(self, 'lecturer_profile', None)
            return self._lecturer_profile
        return None

    @property
    def registrar_profile(self):
        """Returns the Registrar profile if user is a registrar, else None."""
        if hasattr(self, '_registrar_profile'):
            return self._registrar_profile
        if self.role == self.REGISTRAR:
            self._registrar_profile = getattr(self, 'registrar_profile', None)
            return self._registrar_profile
        return None

    # ---- Convenience Methods ----
    def get_role_profile(self):
        """Returns the profile object based on the user's role."""
        return {
            self.STUDENT: self.student_profile,
            self.LECTURER: self.lecturer_profile,
            self.REGISTRAR: self.registrar_profile
        }.get(self.role)

    def get_role_data(self):
        """Returns a dict of role-specific data for API responses."""
        profile = self.get_role_profile()
        if not profile:
            return None
        
        if self.role == self.STUDENT:
            return {
                'student_id': profile.student_id,
                'program': profile.program,
                'year_of_study': profile.year_of_study
            }
        elif self.role == self.LECTURER:
            return {
                'staff_id': profile.staff_id,
                'department': profile.department,
                'specialization': profile.specialization
            }
        elif self.role == self.REGISTRAR:
            return {
                'office': profile.office,
                'contact_info': profile.contact_info
            }

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


class Enrollment(models.Model):
    student = models.ForeignKey('issues.StudentProfile', on_delete=models.CASCADE)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    semester = models.CharField(max_length=20)
    grade = models.CharField(max_length=10, blank=True, null=True)


class Mentorship(models.Model):
    mentor = models.ForeignKey('issues.LecturerProfile', on_delete=models.CASCADE)
    mentee = models.ForeignKey('issues.StudentProfile', on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=10, default='active')


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
