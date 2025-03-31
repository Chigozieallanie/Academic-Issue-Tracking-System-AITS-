from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics,filters
from .models import Issue
from .serializers import IssueSerializer,IssueResponseSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions
from rest_framework.response import Response
from django.core.exceptions import PermissionDenied
from .permissions import IsStudent, IsLecturer, IsRegistrar
from .models import IssueResponse

#def home(request):
    #return HttpResponse("Welcome to the homepage!")



class IssueListCreateView(generics.ListCreateAPIView):
    queryset=Issue.objects.all()
    serializer_class=IssueSerializer
    filter_backends=[filters.SearchFilter]
    search_fields=['title','course','status']
    permission_classes=[IsAuthenticated,IsStudent]


class IssueDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated, IsLecturer]

    def perform_update(self, serializer):
        issue = self.get_object()
        if issue.assigned_lecturer != self.request.user:
            raise PermissionDenied("You are not assigned to this issue.")
        serializer.save()



class IssueListView(generics.ListAPIView):
    queryset=Issue.objects.all()
    serializer_class=IssueSerializer
    filter_backends=[filters.SearchFilter,filters.OrderingFilter]
    search_fields=['title','description','status']
    ordering_fields=['created_at']



class IssueStatusUpdateView(generics.UpdateAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated, IsLecturer]

    def perform_update(self, serializer):
        issue = self.get_object()
        
        if issue.status != 'open':
            raise PermissionDenied("You can only update open issues.")
        serializer.save()






class ResponseCreateView(generics.CreateAPIView):
    queryset = IssueResponse.objects.all()
    serializer_class =IssueResponseSerializer
    permission_classes = [IsAuthenticated, IsLecturer]

    def perform_create(self, serializer):
        issue = serializer.validated_data['issue']
        if issue.assigned_lecturer != self.request.user:
            raise PermissionDenied("You are not assigned to this issue.")
        serializer.save()





