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
class sch_engineer(APIView, CommonResponseMixin):
    def put(self,request):
        if request.session['group']=='teacher':
            # id=request.data.get['id']
            q_id=request.data.get('id')
            q_method=request.data.get('process')
            print(q_method)
            d_obj = device_question.objects.get(id=q_id)
            if q_method=='dealling':
                d_obj.q_dealing=True
            else:
                d_obj.q_over =True
            d_obj.save()

            return JsonResponse(data={}, safe=False)
        else:
            response=self.wrap_json_response(code=ReturnCode.IS_NOT_ADMIN)
            return JsonResponse(data=response, safe=False)

    def get(self, request):
        kinds=request.GET['kind']
        print(kinds)
        typess=request.GET['type']
        if not already_authorized(request):
            response = self.wrap_json_response({}, code=ReturnCode.UNAUTHORIZED)
            return JsonResponse(data=response, safe=False)
        if request.session['group'] == 'teacher':
            if kinds=='done':
                question_set=device_question.objects.filter(q_over=True).order_by('-q_date')
                if typess=='classess':
                    question_set = device_question.objects.filter(q_over=True).order_by('grade','classes')
                elif typess=='classess_over':
                    question_set = device_question.objects.filter(q_over=True).order_by('-grade', '-classes')
            else:
                question_set=device_question.objects.filter(q_over=False).order_by('-q_date')
                # if typess=='classess':
                #     question_set = device_question.objects.filter(q_over=False).order_by('grade','classes')
                # elif typess=='classess_over':
                #     question_set = device_question.objects.filter(q_over=True).order_by('-grade', '-classes')
            question_dict=sch_engineerModelSerializers(question_set,many=True)
            response = self.wrap_json_response(data=question_dict.data, code=ReturnCode.IS_ADMIN)
            return JsonResponse(data=response, safe=False)

        else:

            open_id=request.session['open_id']
            question_set = device_question.objects.filter(q_over=False,user_openid=open_id).order_by('-q_date')
            question_dict = sch_engineerModelSerializers(question_set, many=True)
            response=self.wrap_json_response(data=question_dict.data,code=ReturnCode.IS_NOT_ADMIN)
            return JsonResponse(data=response, safe=False)
    def post(self, request):
        new_question = request.data['form_contents']
        import time
        truly_date = time.strftime('%Y-%m-%d')

        classes=new_question['classes']
        grade=new_question['classes']
        open_id=request.session['open_id']
        one_day_count=device_question.objects.filter(user_openid=open_id,truly_date=truly_date).count()
        if one_day_count>1:
            response = self.wrap_json_response(code=ReturnCode.WRONG_PARMAS)
            return JsonResponse(data=response, safe=False)
        # user_obj=User.objects.filter(open_id=open_id).first()
        new_question['user_openid']=request.session['open_id']
        new_question['truly_date']=truly_date
        email_msg='日期:'+new_question['q_date']+'\n'+'班级:'+new_question['grade']+'年'+new_question['classes']+'班'+'\n'+'具体问题:'+new_question['question']
        device_question.objects.create(**new_question)
        msg = MIMEText(email_msg, "plain", "utf-8")
        msg['FROM'] = "维修部"
        msg['Subject'] = "报修单"
        receivers = ['821908303@qq.com']
        server = smtplib.SMTP_SSL(settings.EMAIL_HOST, settings.EMAIL_PORT)
        server.set_debuglevel(1)
        server.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
        server.sendmail(settings.EMAIL_FROM, receivers, msg.as_string())
        server.close()
        # print('post',new_question)
        response = self.wrap_json_response(code=ReturnCode.SUCCESS)
        return JsonResponse(data=response, safe=False)
