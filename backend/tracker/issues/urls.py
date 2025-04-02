from django.urls import path, include
from django.contrib import admin
from .views import IssueListCreateView, RegisterView, LoginView #, IssueDetailView

urlpatterns = [
    path('issues/', IssueListCreateView.as_view(), name='issue-list-create'),
    # path('issues/<int:pk>/', IssueDetailView.as_view(), name='issue-detail'),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
]