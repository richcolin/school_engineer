# -*- encoding=utf8 -*-
from django.contrib.auth.models import AbstractUser

from django.db import models

# Create your models here.
class User(AbstractUser):
    # open_id
    open_id = models.CharField(max_length=64, unique=True)
    # 昵称
    nickname = models.CharField(max_length=256)

from django.contrib.auth.models import Group

class RoleCode(models.Model):
    code = models.CharField(max_length=64, unique=True)

    groups = models.OneToOneField(to=Group, verbose_name="group_power",on_delete=True)

    class Meta:
        verbose_name_plural ='group_change'

    def __str__(self):
        return self.code