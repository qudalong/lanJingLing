// pages/buhuo/buhuo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['杜蕾斯1', '杜蕾斯2', '杜蕾斯3', '杜蕾斯4'],
    list: [{
      name:'杜蕾斯1'
    },{
      name:'杜蕾斯2'
    },{
      name:'杜蕾斯3'
    },{
      name:'杜蕾斯4'
    }],
    act: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  bindPickerChange: function (e) {
    var index = e.currentTarget.dataset.index;
    var act = e.detail.value;
    this.data.list[index].name=this.data.array[act]
    this.setData({
      act,
      list:this.data.list
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