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

    let userinfo = wx.getStorageSync('userInfo')
    if (userinfo) {
      let user_type = userinfo.user_type;

      this.setData({
        user_type: user_type
      });

    } else {
      wx.redirectTo({
        url: '/pages/login/login',
      });
      return;
    }

    wx.showLoading({
      title: '加载中...',
    });
    let usernamechange = options.usernamechange;
    console.log('usernamechange=' + usernamechange)
    if (!usernamechange) {
      console.log('no')
      this.setData({
        username: wx.getStorageSync('userInfo').tel
      });
    } else {
      console.log('yes')
      this.setData({
        username: usernamechange
      });
    }
    this.loadMachineNotFull();
  },

  //一键补货
  mechbh(option){
    console.log(option);
    let _this = this;
    let imei = option.currentTarget.dataset.imei;
    if(imei){
      wx.showLoading({
        title: '正在提交数据...',
      })
      request({
        url: 'bh',
        data: {
          username: this.data.username,
          imei: imei
        }
      }).then(res => {
        wx.hideLoading();
        if (res.data.success == 'true') {
          wx.showToast({
            title: '补货成功'
          });
        _this.loadMachineNotFull();
        } else {
          wx.showToast({
            title: '补货失败'
          });
        }
      });


    }


  },

  //待补货柜列表
  loadMachineNotFull() {
    request({
      url: 'loadMachineNotFull',
      data: {
        username: this.data.username
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
    this.loadMachineNotFull();
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