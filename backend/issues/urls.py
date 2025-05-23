from django.urls import path
from .views import (
    IssueListCreateView,
    IssueRetrieveUpdateDestroy,
    UserRegistrationView,
    UserLoginView,
    UserLogoutView,
    UserProfileView,
    NotificationListView
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),  
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('logout/', UserLogoutView.as_view(), name='user-logout'),
    path('issues/', IssueListCreateView.as_view(), name='issue-list-create'),
    path('issues/<int:pk>/', IssueRetrieveUpdateDestroy.as_view(), name='issue-detail'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),  
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('notifications/', NotificationListView.as_view(), name='notifications-list'),
]
