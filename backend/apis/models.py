# -*- encoding=utf8 -*-


from django.db import models
from authorization.models import User
# Create your models here.
class device_question(models.Model):

    grade = models.IntegerField()

    classes=models.IntegerField()

    question=models.CharField(max_length=256)

    user_openid=models.ForeignKey(User,on_delete=True)

    q_date=models.DateField(auto_now=False)

    q_status=models.IntegerField()