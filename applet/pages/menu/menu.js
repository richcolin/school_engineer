// pages/menu/menu.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon_path:'',
    grids: [{
      "name": "应用1"
    }, {
      "name": "应用2"
    }, {
      "name": "应用3"
    },], // 九宫格内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateMenuData()
  },

  /**
   * 请求后台，更新menu数据
   */
  updateMenuData: function () {
    var that = this
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/service/menu',
      success: function (res) {
        var menuData = res.data.data
        that.setData({
          grids: menuData
        })
      }
    })
  },
  onNavigatorTap: function (e) {
    var index = e.currentTarget.dataset.index
    var item = this.data.grids[index]

    if (item.app.application == 'school_engineer') {
      console.log('-------------')
      wx.switchTab({
        url: '../login/login',
        
      })
    } else if (item.app.application == 'backup-image') {
      console.log('导航到图片')
      wx.navigateTo({
        url: '../backup/backup',
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