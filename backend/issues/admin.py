from django.contrib import admin
from .models import CustomUser, StudentProfile, LecturerProfile, RegistrarProfile, Issue, Course, Comment, CourseMaterial, Attendance
from .models import Notification

# --- Issue admin customization ---
class IssueAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if request.user.role == 'lecturer':
            return queryset.filter(assigned_to=request.user)
        return queryset

    def get_lecturer(self, obj):
        return obj.assigned_to.username if obj.assigned_to else "No Lecturer Assigned"
    get_lecturer.short_description = 'Lecturer'

    list_display = ('title', 'owner', 'get_lecturer', 'status')


# --- Inline issues under LecturerProfile ---
class IssueInline(admin.TabularInline):
    model = Issue
    fields = ('title', 'status', 'owner', 'coursecode')
    readonly_fields = ('title', 'status', 'owner', 'coursecode')
    can_delete = False
    extra = 0

class LecturerProfileAdmin(admin.ModelAdmin):
    inlines = [IssueInline]
    list_display = ('user', 'staff_id', 'department', 'specialization')


# --- Register models ---
admin.site.register(CustomUser)
admin.site.register(StudentProfile)
admin.site.register(LecturerProfile, LecturerProfileAdmin)
admin.site.register(RegistrarProfile)
admin.site.register(Issue, IssueAdmin)
admin.site.register(Course)
admin.site.register(Comment)
admin.site.register(CourseMaterial)
admin.site.register(Attendance)
admin.site.register(Notification)

