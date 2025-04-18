
from django.contrib import admin
from .models import CustomUser, StudentProfile, LecturerProfile, RegistrarProfile, Issue, Course, Enrollment, Mentorship, Comment, CourseMaterial, Attendance
from .models import Notification

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(StudentProfile)
admin.site.register(LecturerProfile)
admin.site.register(RegistrarProfile)
admin.site.register(Issue)
admin.site.register(Course)
admin.site.register(Enrollment)
admin.site.register(Mentorship)
admin.site.register(Comment)
admin.site.register(CourseMaterial)
admin.site.register(Attendance)
admin.site.register(Notification)




