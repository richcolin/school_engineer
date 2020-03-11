import os
import hashlib
from django.views import View
from django.http import Http404, HttpResponse, FileResponse, JsonResponse
from backend import settings
from utils.response import ReturnCode, CommonResponseMixin
import rest_framework
from  rest_framework.views import APIView
class test_frame(APIView, CommonResponseMixin):
    def post(self, request):
        deathknight = request.data
        print('post',deathknight)
        print(type(deathknight))
        response = self.wrap_json_response(code=ReturnCode.SUCCESS)
        return JsonResponse(data=response, safe=False)
