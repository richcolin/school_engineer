const app = getApp()
const cookieUtil = require('../../utils/cookie.js')
const authUtil = require('../../utils/auth.js')
Page({
  mixins: [require('../../mixin/themeChanged')],
  data: {
    text_place_holder: '学生免密码',
    password: '',
    group: 'student',
    array2: ['学生', '教师'],
    value2: 0,
    input_bool: true
  },
  bindKeyInput: function(e) {

    this.setData({
      password: e.detail.value
    })
  },
  bindPicker2Change: function(e) {
    this.setData({
      value2: e.detail.value
    })
    var that = this
    if (e.detail.value == '1') {
      that.setData({
        group: 'teacher',
        input_bool: false,
        text_place_holder: '教师请输入密码',
        textinput: ''
      })
    } else {
      that.setData({
        group: 'student',
        input_bool: true,
        text_place_holder: '学生免密码',
        textinput: ''
      })
    }
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var that = this
    if (e.detail.value == '2') {
      that.setData({
        group: 'teacher'
      })
    } else {
      that.setData({
        group: 'student'
      })
    }

  },
  onReadCookies: function() {
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/auth/test',
      success(res) {
        var cookie = cookieUtil.getSessionIDFromResponse(res)
        console.log(cookie)
      }
    })
  },
  authorize: function() {
    console.log('authorize')
    var that = this
    // 登陆并获取cookie
    wx.login({
        success: function(res) {
          var code = res.code
          var appId = app.globalData.appId
          var nickname = app.globalData.userInfo.nickName
          var data = {
            code: code,
            appId: appId,
            nickname: nickname,
            group: that.data.group,
            password: that.data.password

          }
          var promise = authUtil.authorize(app, data)
          promise.then(function(res) {
              if (res.data.result_code == -100) {
                wx.showToast({
                  title: res.data.message,
                  icon: 'none'
                })
              } else if (res.data.result_code == 0) {
                wx.showToast({
                  title: '登陆成功',
                })
              
              // 保存cookie
              var cookie = cookieUtil.getSessionIDFromResponse(res)
              cookieUtil.setCookieToStorage(cookie)
              that.setData({
                isLogin: true,
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
              })
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
return_menu(e) {
  wx.navigateTo({
    url: '../menu/menu',
  })
},
onGotUserInfo(e) {
  app.globalData.userInfo = e.detail.userInfo
},

logout: function() {
  var that = this
  var promise = authUtil.logout(app)
  promise.then(function(promiseData) {
    console.log(promiseData)
    if (promiseData) {
      that.setData({
        isLogin: false,
        userInfo: null,
        hasUserInfo: false
      })
      cookieUtil.setCookieToStorage('')
    }
  })
},
onLoad: function(options) {

},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function() {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function() {

},

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function() {

},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function() {

},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function() {

},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function() {

},

});