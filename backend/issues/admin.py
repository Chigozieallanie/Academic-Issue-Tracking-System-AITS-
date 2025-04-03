from django.contrib import admin
from .models import Issue,User
from django.contrib.auth.admin import UserAdmin
admin.site.register(Issue)
admin.site.register(User,UserAdmin)

# Register your models here.
