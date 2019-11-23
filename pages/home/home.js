import {
  request
} from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    falg: 'jxs',
    showPicker: false,
    mainData: '',
    array: [],
    totalMoney: 0,
    username: '',
    usernamechange: '', //切换后的电话
    value: '',
    value_temp: [],
    jxs_temp: [],
    index_z: 0,
    items: [{
        name: 'all',
        value: '全选'
      },
      {
        name: 'item',
        value: '',
        checked: 'true'
      }
    ],
    // index_jxs:0,
    index_yys: 0,
    jxs: [],
    yys: [],
    resultJxs: [],
    resulYys: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var username = wx.getStorageSync('userInfo').tel;
    this.setData({
      username
    })
    this.loadMainDataTotalMoney(username);
    this.loadJxsList(username);
  },

  // 自定义picker-view
  bindChange(e) {
    let index_z = e.detail.value[0];
    this.setData({
      index_z,
      value_temp: this.data.jxs[index_z]
    });
  },

  bindSure() {
    if (this.data.index_z == 0) { //不选择直接点击确定
      this.setData({
        showPicker: false,
        value: this.data.jxs[0]
      });
    } else {
      this.setData({
        showPicker: false,
        value: this.data.value_temp //点击确定输入框才赋值
      });
    }
    let target = this.data.value;
    let username = target.split('_')[1];
    this.setData({
      usernamechange: username //页面跳转传值用
    });
    // console.log('usernamechange---=' + username)
    if (this.data.falg == 'jxs') {
      let user_id = this.data.resultJxs.find(item => item.user == target).user_id;
      this.loadYysList(username, user_id); //根据经销商查询运营商列表
    }
    if (this.data.falg == 'yys') {
      this.loadMainData(username); //根据运营商查询数据
    }
  },
  // 点击经销商
  bindPickerChangeJxs: function(e) {
    this.setData({
      showPicker: true,
      falg: 'jxs'
    });
    this.setData({
      jxs: this.data.jxs_temp //数据重新变成经销商
    });
  },

  //点击运营商
  bindPickerChangeYys: function(e) {
    if (!this.data.yys.length) {
      wx.showToast({
        title: "请先选择经销商",
        icon: 'none'
      });
      return;
    }
    this.setData({
      falg: 'yys',
      showPicker: true,
      jxs: this.data.yys //数据替换
    });
  },

  hidePicker() {
    this.setData({
      showPicker: false
    });
  },

  // 经销商列表
  loadJxsList(username) {
    request({
      url: 'loadJxsList',
      data: {
        username: username
      }
    }).then(res => {
      if (res.statusCode == 200) {
        this.data.jxs = [];
        let data = res.data.jxs_user;
        data.forEach(item => {
          this.data.jxs.push(item.user)
        })
        this.setData({
          jxs: this.data.jxs,
          jxs_temp: this.data.jxs,
          resultJxs: data
        });
      }
    });
  },

  // 运营商列表
  loadYysList(username, jxs_id) {
    request({
      url: 'loadYysList',
      data: {
        username: username,
        jxs_id: jxs_id
      }
    }).then(res => {
      if (res.statusCode == 200) {
        this.data.yys = [];
        let data = res.data.yys_user;
        data.forEach(item => {
          this.data.yys.push(item.user)
        })
        this.setData({
          yys: this.data.yys,
          resulYys: data
        });
        this.loadMainData(this.data.yys[0].split('_')[1]); //切换经销商自动查询第一个运营商
      }
    });
  },

  // 销售总额
  loadMainDataTotalMoney(username) {
    request({
      url: 'loadMainData',
      data: {
        username: username
      }
    }).then(res => {
      if (res.statusCode == 200) {
        for (var i in res.data.next_level_user) {
          this.data.array.push(res.data.next_level_user[i].user);
        }
        this.setData({
          mainData: res.data,
          array: this.data.array,
          totalMoney: res.data.month_money
        });
        wx.stopPullDownRefresh();
      }
    });
  },
  // 选择经销商
  loadMainData(username) {
    request({
      url: 'loadMainData',
      data: {
        username: username
      }
    }).then(res => {
      if (res.statusCode == 200) {
        for (var i in res.data.next_level_user) {
          this.data.array.push(res.data.next_level_user[i].user);
        }
        this.setData({
          mainData: res.data,
          array: this.data.array
        });
      }
    });
  },



  toGuZ() {
    wx.navigateTo({
      url: '/pages/guzhang/guzhang?usernamechange=' + this.data.usernamechange
    })
  },
  toDaiB() {
    wx.navigateTo({
      url: '/pages/lackJiqi/lackJiqi?usernamechange=' + this.data.usernamechange
    })
  },

  radioChange: function(e) {
    let val = e.detail.value;
    if (val == 'all') {
      this.setData({
        value: '',
        yys: [],
        showPicker: false
      })
      this.loadMainDataTotalMoney(this.data.username);
      this.loadJxsList(this.data.username);
    }
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
    this.loadMainDataTotalMoney(this.data.username);
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