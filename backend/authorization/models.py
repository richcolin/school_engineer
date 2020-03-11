# -*- encoding=utf8 -*-
from django.contrib.auth.models import AbstractUser

from django.db import models

# Create your models here.
class User(AbstractUser):
    # open_id
    open_id = models.CharField(max_length=64, unique=True)
    # 昵称
    nickname = models.CharField(max_length=256)

