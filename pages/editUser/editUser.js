import {
  request
} from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telOld: '',//原始密码
    newTel: '',
    username: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var userInfo = wx.getStorageSync('userInfo');
    this.setData({
      telOld: userInfo.tel,//原始密码
      newTel: userInfo.tel,//要是不改密码时
      username: userInfo.user_name
    })
  },
  editUserInfo() {
    let {
      telOld,
      newTel,
      username
    } = this.data;
    if (!telOld.trim()) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return
    } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(telOld)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return
    } else if (!username.trim()) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return
    }
    console.log('tel_old=' + telOld)
    console.log('newTel=' + newTel)
    console.log('user_name=' + username)
    request({
      url: 'editUserInfo',
      data: {
        tel_old: telOld,
        tel: newTel,
        user_name: username
      }
    }).then(res => {
      var result = res.data;
      if (result.success == 'true') {
        wx.showToast({
          title: result.msg
        });
        wx.navigateTo({
          url: '/pages/login/login'
        });
      } else {
        wx.showToast({
          title: result.msg,
          icon: 'none'
        });
      }
    });
  },

  bindTel(e) {
    this.setData({
      newTel: e.detail.value
    });
  },
  bindUsername(e) {
    this.setData({
      username: e.detail.value
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