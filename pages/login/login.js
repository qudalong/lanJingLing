import {
  request
} from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel: '18768871893',
    passworld: '123456'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  login() {
    let {
      tel,
      passworld
    } = this.data;
    if (!tel.trim()) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return
    } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(tel)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return
    } else if (!passworld.trim()) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      });
      return
    } else if (passworld.length < 6) {
      wx.showToast({
        title: '密码不能少于6位',
        icon: 'none'
      });
      return
    }
    wx.showLoading({
      title: '登录中...',
    })
    request({
      url: 'http://www.icprj.com/IC/api/faPublic/list',
      data: {
        type: 1
        // tel: tel,
        // passworld: passworld
      }
    }).then(res => {
      wx.hideLoading();
      wx.switchTab({
        url: '/pages/home/home'
      });
    });
  },


  bindTel(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  bindPassworld(e) {
    this.setData({
      passworld: e.detail.value
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