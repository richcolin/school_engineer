import os
import hashlib
from django.views import View
from django.http import Http404, HttpResponse, FileResponse, JsonResponse
from backend import settings
from utils.response import ReturnCode, CommonResponseMixin
from utils.seri import sch_engineerModelSerializers
from utils.auth import already_authorized,get_user
import rest_framework
from  rest_framework.views import APIView
from apis.models import *
from authorization.models import *
import django
from email.mime.text import MIMEText
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
import smtplib
django.setup()


from django.db.models.aggregates import Count,Sum
class echartss(APIView, CommonResponseMixin):
    def get(self, request):
        ret = device_question.objects.values('grade', 'classes').annotate(Count('id'))
        print(ret)
        percent_list=[]
        sum_all=0
        for item in ret:
            sum_all+=item['id__count']
        print(sum_all)
        for item in ret:
            percent_list.append({'name':str(item['grade'])+'年'+str(item['classes'])+'\n'+str(round(item['id__count']/sum_all*100))+'%','value':round(item['id__count']/sum_all*100)})

        print(percent_list)
        response = self.wrap_json_response(data=percent_list,code=ReturnCode.SUCCESS)
        return JsonResponse(data=response, safe=False)
