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

        if not already_authorized(request):
            response = self.wrap_json_response({}, code=ReturnCode.UNAUTHORIZED)
            return JsonResponse(data=response, safe=False)
        if request.session['group']=='teacher':
            question_set=device_question.objects.filter(q_over=False).order_by('-q_date')
            question_dict=sch_engineerModelSerializers(question_set,many=True)
            response = self.wrap_json_response(data=question_dict.data,code=ReturnCode.IS_ADMIN)
            return JsonResponse(data=response, safe=False)
        else:

            open_id=request.session['open_id']
            question_set = device_question.objects.filter(q_over=False,user_openid=open_id).order_by('-q_date')
            question_dict = sch_engineerModelSerializers(question_set, many=True)
            response=self.wrap_json_response(data=question_dict.data,code=ReturnCode.IS_NOT_ADMIN)
            return JsonResponse(data=response, safe=False)
    def post(self, request):
        new_question = request.data['form_contents']

        # open_id=request.session['open_id']
        # user_obj=User.objects.filter(open_id=open_id).first()

        new_question['user_openid']=request.session['open_id']

        device_question.objects.create(**new_question)
        # print('post',new_question)

        response = self.wrap_json_response(code=ReturnCode.SUCCESS)
        return JsonResponse(data=response, safe=False)