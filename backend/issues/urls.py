from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DepartmentViewSet, IssueViewSet

router = DefaultRouter()
router.register(r'departments', DepartmentViewSet)
router.register(r'issues', IssueViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
