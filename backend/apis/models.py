# -*- encoding=utf8 -*-


from django.db import models
from authorization.models import User

# Create your models here.
class device_question(models.Model):

    grade = models.IntegerField()

    classes=models.IntegerField()

    question=models.CharField(max_length=256)

    user_openid=models.CharField(max_length=256)

    q_date=models.DateField(auto_now=False)

    q_dealing=models.BooleanField(default=False)

    q_over=models.BooleanField(default=False)

    truly_date=models.DateField(auto_now=False)
    def __str__(self):
        return self.q_date