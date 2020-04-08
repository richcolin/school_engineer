//index.js
//获取应用实例
const app = getApp()
const cookieUtil = require('../../utils/cookie.js')
const authUtil = require('../../utils/auth.js')
Page({
  data: {
    toast_reflection:'',
    textinput:"",
    toast: false,
    loading: false,
    hideToast: false,
    hideLoading: false,
    isAuthorized: false,
    date: "",
    array1: ['请选择','初一', '初二', '初三'],
    array3: ['请选择', '1班', '2班', '3班', '4班', '5班', '6班', '7班', '8班', '9班', '10班'],
    value1: 0,
    value3: 0,

  },
  mixins: [require('../../mixin/themeChanged')],
  onPullDownRefresh: function () {
    this.onLoad()
  },
  openToast: function () {
    this.setData({
      toast: true
    });
    setTimeout(() => {
      this.setData({
        hideToast: true
      });
      setTimeout(() => {
        this.setData({
          toast: false,
          hideToast: false,
        });
      }, 300);
    }, 3000);
  },
  openLoading: function () {
    this.setData({
      loading: true
    });
    setTimeout(() => {
      this.setData({
        hideLoading: true
      });
      setTimeout(() => {
        this.setData({
          loading: false,
          hideLoading: false,
        });
      }, 300);
    }, 3000);
  },
  updateData: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    wx.showToast({
      title: '授权成功',
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  onShow: function () {
    this.onLoad();
  },

  onLoad: function () {
    var that = this
    var promise = authUtil.getStatus(app)
    promise.then(function (status) {
      if (status) {
        that.updateData()
        that.setData({
          isAuthorized: true
        })
      } else {
        that.setData({
          isAuthorized: false
        })
        wx.showToast({
          title: '请先授权登录',
        })
      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  bindPicker1Change: function (e) {
    this.setData({
      value1: e.detail.value
    })
    
  },

  bindPicker3Change: function (e) {
    this.setData({
      value3: e.detail.value
    })
  },

  formSubmit: function (e) {
    that=this
    if (that.data.value1 == "0" || that.data.value3 == "0" ||that.data.date=='' ){
      console.log(0)
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 2000
      })
      
    }else{
    wx.showLoading({
      title: '数据提交中',
    })
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var that = this;
    var header = {}
    if (this.data.isAuthorized) {
      const cookie = cookieUtil.getCookieFromStorage()
      header.Cookie = cookie
    }
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/service/sch_engineer',
      method: 'POST',
      header: header,
      data: {
        form_contents: e.detail.value
      },
      success: function (res) {
        if(res.data.message=='wrong params')
        {
          that.setData({
            toast_reflection:false
          })
        }else{
          that.setData({
            toast_reflection: true
          })
        }
        that.setData({
          toast: true,
          textinput: ''
        })
        wx.hideLoading()
        setTimeout(() => {
          that.setData({
            hideToast: true
          });
          setTimeout(() => {
            that.setData({
              toast: false,
              hideToast: false,
            });
          }, 300);
        }, 3000);
      }
    })
    }
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }

},




);