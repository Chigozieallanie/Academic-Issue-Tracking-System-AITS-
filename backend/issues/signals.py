# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Issue, Comment, Notification

@receiver(post_save, sender=Issue)
def notify_issue_assignment(sender, instance, created, **kwargs):
    if created and instance.assigned_to:
        Notification.objects.create(
            user=instance.assigned_to,  # assuming your Issue model has `assigned_to`
            message=f"A new issue has been assigned to you: {instance.title}"
        )

@receiver(post_save, sender=Comment)
def notify_new_comment(sender, instance, created, **kwargs):
    if created and instance.assigned_to:
        Notification.objects.create(
            user=instance.issue.assigned_to,  # assuming each comment relates to an issue
            message=f"New comment on your assigned issue: {instance.issue.title}"
        )
