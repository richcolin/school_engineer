const app = getApp()
const cookieUtil = require('../../utils/cookie.js')
Page({
  mixins: [require('../../mixin/themeChanged')],
  data: {
    password: '',
    group:'student',
    items: [
      { name: '1', value: '电教管理员', checked: 'true' },
      { name: '2', value: '电教老师'},
    ]
  },
  bindKeyInput: function (e) {
   
    this.setData({
      password: e.detail.value
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var that=this
    if(e.detail.value=='2')
    {
      that.setData({
        group:'teacher'
      })
    }else{
      that.setData({
        group:'student'
      })
    }
    
  },
  onReadCookies: function () {
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/auth/test',
      success(res) {
        var cookie = cookieUtil.getSessionIDFromResponse(res)
        console.log(cookie)
      }
    }
    )
  },
  authorize: function () {
    console.log('authorize')
    var that = this
    // 登陆并获取cookie
    wx.login({
      success: function (res) {

        var code = res.code
        var appId = app.globalData.appId
        var nickname = app.globalData.userInfo.nickName
        // 请求后台
        wx.request({
          url: app.globalData.serverUrl + app.globalData.apiVersion + '/auth/authorize',
          method: 'POST',
          data: {
            code: code,
            appId: appId,
            nickname: nickname,
            group:that.data.group,
            password: that.data.password
           
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            // wx.showToast({
            //   title: res.data.message,
            // })
            // wx.reLaunch({
            //   url: '../index/index',

            // })
            // 保存cookie
            var cookie = cookieUtil.getSessionIDFromResponse(res)
            cookieUtil.setCookieToStorage(cookie)
            that.setData({
              isLogin: true,
              userInfo: app.globalData.userInfo,
              hasUserInfo: true
            })
            app.setAuthStatus(true)
          }
        })
      }
    })

    // if (that.data.group=='teacher'){
    //   var nav_url = '../backstage/backstage'
    // }else{
    //   var nav_url = '../input/input'
    // }
    // wx.reLaunch({
      
    //   url: nav_url,
    //   success: function (e) {
    //     var page = getCurrentPages().pop();
    //     if (page == undefined || page == null) return;
    //     page.onLoad();
    //   }
    // })
  },
  onGotUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo
  },
  logout: function () {
    var that = this
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/auth/logout',
      method: 'GET',
      header: header,
      success(res) {
        app.setAuthStatus(false)
        that.setData({
          isLogin: false,
          userInfo: null,
          hasUserInfo: false
        })
        cookieUtil.setCookieToStorage('')
        app.setAuthStatus(false)
      }
    })
  },
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

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
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

});