import os
import hashlib
from django.views import View
from django.http import Http404, HttpResponse, FileResponse, JsonResponse
from rest_framework.response import Response
from apis.models import *
from  rest_framework.views import APIView
from rest_framework import serializers
class sch_engineerModelSerializers(serializers.ModelSerializer):
    class Meta:
        model=device_question
        fields='__all__'
