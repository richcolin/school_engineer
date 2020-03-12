#!/usr/bin/python                                                                  
# -*-encoding=utf8 -*-                                                             
# @Author         : imooc
# @Email          : imooc@foxmail.com
# @Created at     : 2018/11/30
# @Filename       : response.py
# @Desc           :


# 状态码
class ReturnCode:
    SUCCESS = 0
    IS_ADMIN=505
    FAILED = -100
    WRONG_PARMAS = -101
    RESOURCE_NOT_FOUND = -102
    IS_NOT_ADMIN=510
    UNAUTHORIZED = -500
    BROKEN_AUTHORIZED_DATA = -501
    SESSION_EXPIRED = -502

    @classmethod
    def message(cls, code):
        if code == cls.SUCCESS:
            return 'success'
        elif code == cls.FAILED:
            return 'failed'
        elif code == cls.UNAUTHORIZED:
            return 'unauthorized'
        elif code == cls.WRONG_PARMAS:
            return 'wrong params'
        elif code == cls.RESOURCE_NOT_FOUND:
            return 'resources not found'
        elif code == cls.UNAUTHORIZED:
            return 'request unauthorized'
        elif code == cls.BROKEN_AUTHORIZED_DATA:
            return 'broken authorized data'
        elif code == cls.SESSION_EXPIRED:
            return 'session expired'
        elif code == cls.IS_ADMIN:
            return 'user is admin'
        elif code == cls.IS_NOT_ADMIN:
            return 'user is not admin'

def wrap_json_response(data=None, code=None, message=None):
    response = {}
    if not code:
        code = ReturnCode.SUCCESS
    if not message:
        message = ReturnCode.message(code)
    if data is not None:
        response['data'] = data
    response['result_code'] = code
    response['message'] = message
    return response


class CommonResponseMixin(object):
    @classmethod
    def wrap_json_response(cls, data=None, code=None, message=None):
        response = {}
        if not code:
            code = ReturnCode.SUCCESS
        if not message:
            message = ReturnCode.message(code)
        if data is not None:
            response['data'] = data
        response['result_code'] = code
        response['message'] = message
        return response
