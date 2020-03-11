# -*- encoding=utf-8 -*-


import json
from django.contrib.auth.models import Permission,ContentType,Group
from django.http import JsonResponse
from django.views import View
from utils.response import wrap_json_response, ReturnCode, CommonResponseMixin
from utils.auth import already_authorized, c2s

from .models import User

def test_session(request):
    request.session['message'] = 'Test Django Session OK!'
    response = wrap_json_response(code=ReturnCode.SUCCESS)
    return JsonResponse(data=response, safe=False)


def __authorize_by_code(request):
    '''
    使用wx.login的到的临时code到微信提供的code2session接口授权

    post_data = {
        'encryptedData': 'xxxx',
        'appId': 'xxx',
        'sessionKey': 'xxx',
        'iv': 'xxx'
    }
    '''
    response = {}
    post_data = request.body.decode('utf-8')
    post_data = json.loads(post_data)
    app_id = post_data.get('appId').strip()
    nickname = post_data.get('nickname').strip()
    code = post_data.get('code').strip()
    group_bool=post_data.get('group')
    password=post_data.get('password')

    student_pwd=Group.objects.filter(id=1).first().name
    teacher_pwd=Group.objects.filter(id=2).first().name
    if not (app_id and code):
        response['result_code'] = ReturnCode.BROKEN_AUTHORIZED_DATA
        response['message'] = 'authorized failed. need entire authorization data.'
        return JsonResponse(response, safe=False)
    try:
        data = c2s(app_id, code)
    except Exception as e:
        print(e)
        response['result_code'] = ReturnCode.FAILED
        response['message'] = 'authorized failed.'
        return JsonResponse(response, safe=False)
    open_id = data.get('openid')
    if not open_id:
        response['result_code'] = ReturnCode.FAILED
        response['message'] = 'authorization error.'
        return JsonResponse(response, safe=False)
    if group_bool and password!=teacher_pwd:
        response['result_code'] = ReturnCode.FAILED
        response['message'] = '密码错误.'
        return JsonResponse(response, safe=False)
    if not group_bool and password!=student_pwd:
        response['result_code'] = ReturnCode.FAILED
        response['message'] = '密码错误.'
        return JsonResponse(response, safe=False)
    request.session['open_id'] = open_id
    request.session['is_authorized'] = True
    request.session['group']=group_bool

    print('session group is',request.session['group'])

    # User.objects.get(open_id=open_id) # 不要用get，用get查询如果结果数量 !=1 就会抛异常
    # 如果用户不存在，则新建用户
    if not User.objects.filter(open_id=open_id):


        if group_bool:
            print('is admin')
            isAdmin=1
            group = Group.objects.filter(id=2).first()
            new_user = User.objects.create_user(open_id=open_id, username=nickname, nickname=nickname)
        else:
            print('is student')
            isAdmin=0
            group = Group.objects.filter(id=1).first()
            new_user = User.objects.create_user(open_id=open_id, username=nickname, nickname=nickname)
        new_user.groups.add(group)
        new_user.save()

    else:
        if group_bool:
            print('is admin')
            isAdmin = 1
            group = Group.objects.filter(id=2).first()
            new_user = User.objects.filter(open_id=open_id).first()
        else:
            print('is student')
            isAdmin = 0
            group = Group.objects.filter(id=1).first()
            new_user = User.objects.filter(open_id=open_id).first()
        new_user.groups.add(group)
        new_user.save()

    message = 'user authorize successfully.'
    response = wrap_json_response(data={}, code=ReturnCode.SUCCESS, message=message)
    return JsonResponse(response, safe=False)


# 判断是否已经登陆
def get_status(request):
    print('call get_status function...')
    if already_authorized(request):
        data = {"is_authorized": 1}
    else:
        data = {"is_authorized": 0}
    response = CommonResponseMixin.wrap_json_response(data=data, code=ReturnCode.SUCCESS)
    return JsonResponse(response, safe=False)


def authorize(request):
    return __authorize_by_code(request)


def logout(request):
    '''
    注销，小程序删除存储的Cookies
    '''
    request.session.clear()
    response = {}
    response['result_code'] = 0
    response['message'] = 'logout success.'
    return JsonResponse(response, safe=False)


