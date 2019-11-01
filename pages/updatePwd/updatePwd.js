import {
  request
} from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    pwd: '',
    newPwd: '',
    renewPwd: '',
    initPwd: '' //登录时输入的密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var initPwd = wx.getStorageSync('initPwd');
    this.setData({
      initPwd
    });
  },
  //修改密码
  editUserPwd() {
    var {
      pwd,
      newPwd,
      renewPwd,
      initPwd
    } = this.data;
    if (!pwd.trim()) {
      wx.showToast({
        title: '请输入原密码',
        icon: 'none'
      });
      return
    } else if (pwd.trim() != initPwd) {
      wx.showToast({
        title: '原密码错误',
        icon: 'none'
      });
      return
    } else if (!newPwd.trim()) {
      wx.showToast({
        title: '请输入新密码',
        icon: 'none'
      });
      return
    } else if (newPwd.trim().length < 6) {
      wx.showToast({
        title: '新密码不能少于6位',
        icon: 'none'
      });
      return
    } else if (!renewPwd.trim()) {
      wx.showToast({
        title: '请再次输入新密码',
        icon: 'none'
      });
      return
    } else if (renewPwd.trim() != newPwd.trim()) {
      wx.showToast({
        title: '再次输入密码错误',
        icon: 'none'
      });
      return
    }
    request({
      url: 'editUserPwd',
      data: {
        tel: pwd,
        pwd: newPwd,
        pwd_old: renewPwd
      }
    }).then(res => {
      console.log(res)
      if (res.data.success == 'true') {
        wx.showToast({
          title: res.data.msg
        });
        wx.navigateTo({
          url: '/pages/login/login'
        })
      } else {
        wx.showToast({
          title: '修改密码失败',
          icon: 'none'
        });
      }
    });
  },
  bindpwd(e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  bindnewPwd(e) {
    this.setData({
      newPwd: e.detail.value
    })
  },
  bindrenewPwd(e) {
    this.setData({
      renewPwd: e.detail.value
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