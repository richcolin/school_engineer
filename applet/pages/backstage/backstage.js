// pages/backstage/backstage.js
//index.js
//获取应用实例
const app = getApp()
const cookieUtil = require('../../utils/cookie.js')
Page({
  mixins: [require('../../mixin/themeChanged')],
  /**
   * 页面的初始数据
   */
  data: {
    isAdmin:1,
    django_data:'',
    isAuthorized: false,
    grade:'',
    classes:'',
    question:'',
    q_date:'',
    array1: ['请选择', '初一', '初二', '初三'],
    array3: ['请选择', '1班', '2班', '3班'],
    value1: 0,
    value3: 0,
  },

  onPullDownRefresh: function () {
    var that = this
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/service/sch_engineer',
      method: 'GET',
      header: header,
      data: {
      },
      success: function (res) {
        console.log(res.data.message)
        that.setData({
          django_data: res.data.data
        })


      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
      },
      success: function (res) {
        console.log(res.data.message)
        that.setData({
          isAdmin:res.data
        })
        console.log(res.data)
      
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})