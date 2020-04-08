import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
var orange=[]
function initChart(canvas, width, height) {
  var that=this
  wx.request({
    url: app.globalData.serverUrl + app.globalData.apiVersion + '/service/echartss',
    method: 'GET',
    data: {
    },
    success: function (res) {
     var fruit=res.data.data
      console.log(fruit)
      var option = {
        backgroundColor: "#ffffff",
        color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        series: [{
          label: {
            normal: {
              fontSize: 12
            }
          },
          type: 'pie',
          center: ['50%', '40%'],
          radius: [0, '55%'],
          // data:fruit,
          data: fruit,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 2, 2, 0.3)'
            }
          }
        }]
      };
      chart.setOption(option);
    }
  })
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);


  
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
     
    },
    fruit:[]
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/service/echartss',
      method: 'GET',
      data: {
      },
      success: function (res) {
        console.log(that.data.ec.onInit)
      }
    })

  },
  onReady() {
  },

  echartInit(e) {
    initChart(e.detail.canvas, e.detail.width, e.detail.height);
  }
});
