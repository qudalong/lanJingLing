import {
  request
} from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    imei: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      username: wx.getStorageSync('userInfo').tel
    });

  },
  //扫码开柜补货
  openDoor() {
    request({
      url: 'openDoor',
      data: {
        username: this.data.username,
        imei: this.data.imei
      }
    }).then(res => {
      wx.showToast({
        title: res.data.msg
      })
    });
  },
  // 扫码
  scanCode() {
    wx.scanCode({
      onlyFromCamera: true,
      success: res => {
        // console.log(res)
        this.setData({
          imei: res.result.split("=")[1]
        });
        // 扫码开柜补货
        this.openDoor();
      }
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})