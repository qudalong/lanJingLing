import {
  request
} from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    badList: [],
    username: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let usernamechange = options.usernamechange;
    console.log('usernamechange=' + usernamechange)
    if (!usernamechange){
      console.log('1')
      this.setData({
        username: wx.getStorageSync('userInfo').tel
      });
    }else{
      console.log('2')
      this.setData({
        username: usernamechange
      });
    }
    this.loadMachineBad();
  },

  //故障列表
  loadMachineBad() {
    request({
      url: 'loadMachineBad',
      data: {
        username: this.data.username
      }
    }).then(res => {
      if (res.statusCode == 200) {
        this.setData({
          badList: res.data.machine_bad
        });
        wx.stopPullDownRefresh();
      }
    });
  },

  //恢复交易
  enableMachine(e) {
    var imei = e.target.dataset.imei;
    request({
      url: 'enableMachine',
      data: {
        imei: imei
      }
    }).then(res => {
      if (res.statusCode == 200) {
        wx.showToast({
          title: '恢复成功'
        });
        this.loadMachineBad(this.data.username); // 更新数据
      }else{
        wx.showToast({
          title: '恢复失败'
        });
      }
    });
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
    wx.showLoading({
      title: '刷新中...',
    });
    this.loadMachineBad();
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