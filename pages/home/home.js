import {
  request
} from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainData: '',
    array: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var username = wx.getStorageSync('userInfo').tel;
    this.loadMainData(username);
  },

  // 选择经销商
  loadMainData(username) {
    request({
      url: 'loadMainData',
      data: {
        username: username
      }
    }).then(res => {
      console.log(res)
      if (res.statusCode == 200) {
        for (var i in res.data.next_level_user) {
          this.data.array.push(res.data.next_level_user[i].user);
        }
        this.setData({
          mainData: res.data,
          array: this.data.array
        })
      }
    });
  },


  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
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