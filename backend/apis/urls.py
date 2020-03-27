#!/usr/bin/python                                                                  
# -*-encoding=utf8 -*-                                                             
# @Author         : imooc
# @Email          : imooc@foxmail.com
# @Created at     : 2018/11/26
# @Filename       : urls.py
# @Desc           :

from django.urls import path

from .views import  menu, image, service,test_frame,sch_engineer,echartss

urlpatterns = [
    # path('', weather.helloworld)
    # path('weather', weather.WeatherView.as_view()),
    path('menu', menu.get_menu),
    path('image', image.ImageView.as_view()),
    path('image/list', image.ImageListView.as_view()),
    path('test_frame',test_frame.test_frame.as_view()),
    path('constellation', service.constellation),
    path('joke', service.joke),
    path('today', service.history_today),
    path('stock', service.stock),
    path('sch_engineer', sch_engineer.sch_engineer.as_view()),
    path('menu', menu.get_menu),
    path('echartss',echartss.echartss.as_view())
]
