#!/usr/bin/python                                                                  
# -*-encoding=utf8 -*-                                                             
# @Author         :
# @Email          : imooc@foxmail.com
# @Created at     : 2018/11/2
# @Filename       : version_1_0.py
# @Desc           :

from django.contrib import admin
from django.urls import path, include
import index
urlpatterns = [
    path('service/', include('apis.urls')),
    path('auth/', include('authorization.urls')),

]
