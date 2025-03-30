from django.db import models
from django.contrib.auth.models import AbstractUser

ROLE_CHOICES=[
        ('student','Student'),
        ('lecturer','Lecturer'),
       ('registrar','Registrar'),

    ]


class User(AbstractUser):    

    role=models.CharField(max_length=10,choices=ROLE_CHOICES,default='student')

    def __str__(self):
        return self.username

class Department(models.Model):
    name=models.CharField(max_length=255,unique=True)

    def __str__(self):
        return self.name


class Issue(models.Model):
    STATUS_CHOICES=[
        ('open','Open'),
        ('in_progress','In progress'),
        ('resolved','Resolved'),
    ]

    CATEGORY_CHOICES=[
        ('missing marks','Missing marks'),
        ('appeals','Appeals'),
        ('corrections','Corrections'),
    ] 


    student=models.ForeignKey(User,on_delete=models.CASCADE,limit_choices_to={'role':'student'}, related_name='issues_created')
    department=models.ForeignKey(Department,on_delete=models.CASCADE)
    course=models.CharField(max_length=255,null=True,blank=True,default='')
    title = models.CharField(max_length=200)
    description = models.TextField()
    attachment=models.FileField(upload_to='issue_attachments/',blank=True,null=True)
    status=models.CharField(max_length=20,choices=STATUS_CHOICES,default='open')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    category=models.CharField(max_length=20,choices=CATEGORY_CHOICES,default='missing marks')
    assigned_lecturer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, limit_choices_to={'role': 'lecturer'}, related_name='issues_assigned')
    


    def __str__(self):
        return self.title
    
class IssueResponse(models.Model):
    issue=models.ForeignKey(Issue,on_delete=models.CASCADE,related_name='responses')
    responder=models.ForeignKey(User,on_delete=models.CASCADE,limit_choices_to={'role':'lecturer'})
    response_text=models.TextField()
    responded_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Response to Issue {self.issue.id} by {self.responder.username}'

