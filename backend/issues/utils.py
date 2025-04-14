from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags

def send_status_update_email(issue):
    subject = f"Issue {issue.id} - Status Updated"
    recipient_list = [issue.owner.email, issue.assigned_to.email]  # Add Lecturer or any other recipients if needed.

    # Create the HTML content using Django templates
    html_message = render_to_string('email_templates/issue_status_update.html', {'issue': issue})
    
    # The plain text version is also created using the strip_tags function to remove HTML if the email client cannot render HTML
    plain_message = strip_tags(html_message)

    send_mail(
        subject,
        plain_message,
        'no-reply@example.com',  # This can be your sender's email address
        recipient_list,
        html_message=html_message  # Attach the HTML version of the message
    )
