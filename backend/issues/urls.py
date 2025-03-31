from django.urls import path
from .views import (
    IssueListCreateView,
    IssueDetailView,
    ResponseCreateView,
    IssueStatusUpdateView,
    IssueListView,
)

urlpatterns = [
    path('issues/', IssueListCreateView.as_view(), name='issue-list-create'),
    path('issues/<int:pk>/', IssueDetailView.as_view(), name='issue-detail'),
    path('issues/<int:pk>/status/', IssueStatusUpdateView.as_view(), name='issue-status-update'),
    path('issues/list/', IssueListView.as_view(), name='issue-list'),
    path('response/', ResponseCreateView.as_view(), name='response-create'),
]

