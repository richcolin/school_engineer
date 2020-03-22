// pages/backstage/backstage.js
//index.js
//获取应用实例
const app = getApp()
const cookieUtil = require('../../utils/cookie.js')
Page({
  mixins: [require('../../mixin/themeChanged')],
  data: {
    isAdmin: false,
    django_data: '',
    isAuthorized: false,
    grade: '',
    classes: '',
    question: '',
    q_date: '',
    array1: ['请选择', '初一', '初二', '初三'],
    array3: ['请选择', '1班', '2班', '3班'],
    value1: 0,
    value3: 0,
  },
  navigateToHistory: function () {
    console.log('history')
    wx.navigateTo({
      url: '../history/history',
      success: function (res) { },
      fail: function (res) { console.log(res) },
      complete: function (res) { },
    })

  },
  datess:function(){
    var that = this
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/service/sch_engineer',
      method: 'GET',
      header: header,
      data: {
        kind:'done',
        type: 'history'
      },
      success: function (res) {

        if (res.data.result_code == -500) {
          that.setData({
            isAdmin: false,
            isAuthorized: false
          })
          wx.showToast({
            title: '请到首页进行登录',
          })
        } else if (res.data.result_code == 510) {
          that.setData({
            isAdmin: false,
            django_data: res.data.data,
            isAuthorized: true
          })
        }
        else {
          that.setData({
            isAuthorized: true,
            isAdmin: true,
            django_data: res.data.data
          })
          console.log(that.data.django_data)
        }
      }
    })

  },
  onPullDownRefresh: function () {
    this.onLoad()
  },
  onPostTap_dealling: function (event) {
    var postId = event.currentTarget.dataset.postid
    var that = this
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/service/sch_engineer',
      method: 'put',
      header: header,
      data: {
        id: postId,
        process: 'dealling'
      },
      success: function (res) {
        if (res.data.result_code == -500) {
          that.setData({
            isAdmin: false,
          })
          wx.showToast({
            title: '请到首页进行登录',
          })
        } else if (res.data.result_code == 510) {
          that.setData({
            isAdmin: false,
            django_data: res.data.data
          })
          wx.showToast({
            title: '登陆成功',
          })
        }
        else {
          that.setData({
            isAdmin: true,
            django_data: res.data.data
          })
          console.log(that.data.django_data)
          that.onLoad()
        }
      }
    })

  },
  onPostTap_over: function (event) {
    var postId = event.currentTarget.dataset.postid
    var that = this
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/service/sch_engineer',
      method: 'put',
      header: header,
      data: {
        id: postId,
        process: 'over'
      },
      success: function (res) {
        if (res.data.result_code == -500) {
          that.setData({
            isAdmin: false,
          })
          wx.showToast({
            title: '请到首页进行登录',
          })
        } else if (res.data.result_code == 510) {
          that.setData({
            isAdmin: false,
            django_data: res.data.data
          })
        }
        else {
          that.setData({
            isAdmin: true,
            django_data: res.data.data
          })
          that.onLoad()
          console.log(that.data.django_data)
        }

      }
    })

  },
  classess_over:function(){
    var that = this
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/service/sch_engineer',
      method: 'GET',
      header: header,
      data: {
        kind: 'done',
        type: 'classess_over'
      },
      success: function (res) {

        if (res.data.result_code == -500) {
          that.setData({
            isAdmin: false,
            isAuthorized: false
          })
          wx.showToast({
            title: '请到首页进行登录',
          })
        } else if (res.data.result_code == 510) {
          that.setData({
            isAdmin: false,
            django_data: res.data.data,
            isAuthorized: true
          })
        }
        else {
          that.setData({
            isAuthorized: true,
            isAdmin: true,
            django_data: res.data.data
          })
          console.log(that.data.django_data)
        }
      }
    })
  },
  classess:function(){
    var that = this
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/service/sch_engineer',
      method: 'GET',
      header: header,
      data: {
        kind: 'done',
        type: 'classess'
      },
      success: function (res) {

        if (res.data.result_code == -500) {
          that.setData({
            isAdmin: false,
            isAuthorized: false
          })
          wx.showToast({
            title: '请到首页进行登录',
          })
        } else if (res.data.result_code == 510) {
          that.setData({
            isAdmin: false,
            django_data: res.data.data,
            isAuthorized: true
          })
        }
        else {
          that.setData({
            isAuthorized: true,
            isAdmin: true,
            django_data: res.data.data
          })
          console.log(that.data.django_data)
        }
      }
    })

  },
  onLoad: function () {
    var that = this
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/service/sch_engineer',
      method: 'GET',
      header: header,
      data: {
        kind:'done',
        type:'history'
      },
      success: function (res) {

        if (res.data.result_code == -500) {
          that.setData({
            isAdmin: false,
            isAuthorized: false
          })
          wx.showToast({
            title: '请到首页进行登录',
          })
        } else if (res.data.result_code == 510) {
          that.setData({
            isAdmin: false,
            django_data: res.data.data,
            isAuthorized: true
          })
        }
        else {
          that.setData({
            isAuthorized: true,
            isAdmin: true,
            django_data: res.data.data
          })
          console.log(that.data.django_data)
        }
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  onShow: function () {
    this.onLoad()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})