from rest_framework import serializers
from .models import Issue,IssueResponse
class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model=Issue
        fields='__all__'

    def validate_title(self,value):
        if len(value)<5:
            raise serializers.ValidationError('Title must be at least 5 characters long.')
        return value    
    def validate_description(self,value):
        if len(value)<10:
            raise serializers.ValidationError('Description must be at least 10 characters long.')
        return value    
    def validate_status(self,value):
        allowed_statuses=['open','in_progress','resolved']
        if value not in allowed_statuses:
            raise serializers.ValidationError('Invalid status.Choose Open,In Progress or Resolved.')
        return value
    
class IssueResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model=IssueResponse
        fields='__all__'    