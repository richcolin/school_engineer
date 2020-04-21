from django.shortcuts import render,HttpResponse,redirect

from django import views
# Create your views here.
class index(views.View):
    def get(self,req,*args,**kwargs):
        return render(req,'index.html')
