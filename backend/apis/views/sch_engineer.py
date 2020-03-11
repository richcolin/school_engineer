import os
import hashlib
from django.views import View
from django.http import Http404, HttpResponse, FileResponse, JsonResponse
from backend import settings
from utils.response import ReturnCode, CommonResponseMixin
from utils.seri import sch_engineerModelSerializers
import rest_framework
from  rest_framework.views import APIView
from apis.models import *
from authorization.models import *
class sch_engineer(APIView, CommonResponseMixin):
    def get(self, request):

        if request.session['group']:
            deathknight = request.GET
            question_set=device_question.objects.all().order_by('-q_date')
            question_dict=sch_engineerModelSerializers(question_set,many=True)
            print(question_dict.data)
            print(type(question_dict.data))
            response = self.wrap_json_response(data=question_dict.data,code=ReturnCode.SUCCESS)
            return JsonResponse(data=response, safe=False)
        else:
            response=self.wrap_json_response(code=ReturnCode.UNAUTHORIZED)
            return JsonResponse(data=response, safe=False)
    def post(self, request):
        new_question = request.data['form_contents']

        open_id=request.session['open_id']
        user_obj=User.objects.filter(open_id=open_id).first()

        new_question['user_openid']=user_obj

        device_question.objects.create(**new_question)
        # print('post',new_question)

        response = self.wrap_json_response(code=ReturnCode.SUCCESS)
        return JsonResponse(data=response, safe=False)
