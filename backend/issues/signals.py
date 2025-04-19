from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import Issue, Comment, Notification

@receiver(pre_save, sender=Issue)
def notify_issue_status_change(sender, instance, **kwargs):
    if not instance.pk:
        return  # Skip if it's a new issue

    try:
        old_issue = Issue.objects.get(pk=instance.pk)
    except Issue.DoesNotExist:
        return  # If it somehow doesn't exist, skip

    # Notify owner if status has changed
    if old_issue.status != instance.status:
        Notification.objects.create(
            user=instance.owner,
            message=f"Your issue '{instance.title}' status has been updated to '{instance.status}'."
        )


@receiver(post_save, sender=Issue)
def handle_issue_assignment(sender, instance, created, **kwargs):
    # If newly created and assigned, notify the assignee
    if created and instance.assigned_to:
        Notification.objects.create(
            user=instance.assigned_to,
            message=f"A new issue has been assigned to you: {instance.title}"
        )

    # Automatically set status to 'assigned' when assigned but still open or pending
    if instance.assigned_to and instance.status in ['open', 'pending']:
        instance.status = 'assigned'
        instance.save()


@receiver(post_save, sender=Comment)
def handle_new_comment(sender, instance, created, **kwargs):
    if created:
        issue = instance.issue

        # Notify the assignee if the issue is assigned
        if issue.assigned_to:
            Notification.objects.create(
                user=issue.assigned_to,
                message=f"New comment on your assigned issue: {issue.title}"
            )

        # Automatically set status to 'resolved' if not already
        if issue.status != 'resolved':
            issue.status = 'resolved'
            issue.save()
