import {
  request
} from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notFullList: [],
    username:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    });
    var username = wx.getStorageSync('userInfo').tel;
    this.setData({
      username
    })
    this.loadMachineNotFull(username);
  },

  //待补货柜列表
  loadMachineNotFull(username) {
    request({
      url: 'loadMachineNotFull',
      data: {
        username: username
      }
    }).then(res => {
      if (res.statusCode == 200) {
        wx.hideLoading();
        this.setData({
          notFullList: res.data.machine_not_full
        });
        wx.stopPullDownRefresh();
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
    this.loadMachineNotFull(this.data.username);
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