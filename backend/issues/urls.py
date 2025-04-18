from django.urls import path, include
from django.contrib import admin
from .views import IssueListCreateView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import IssueRetrieveUpdateDestroy  # Import the view

# RegisterView, LoginView #, IssueDetailView
from .views import UserRegistrationView, UserLoginView, UserLogoutView, UserProfileView

urlpatterns = [
    path('register', UserRegistrationView.as_view(), name='user-register-no-slash'),
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('login', UserLoginView.as_view(), name='user-login'),
    path('logout/', UserLogoutView.as_view(), name='user-logout'),
    path('issues/', IssueListCreateView.as_view(), name='issue-list-create'),
    path('issues/<int:pk>/', IssueRetrieveUpdateDestroy.as_view(), name='issue-detail'),  
    path('profile', UserProfileView.as_view(), name='user-profile'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('issues/<int:pk>/', IssueDetailView.as_view(), name='issue-detail'),
   
]