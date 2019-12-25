import {
  request
} from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myData:'',
    imei:'',
		show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let userinfo = wx.getStorageSync('userInfo')
    if(userinfo){
      let user_type = userinfo.user_type;

      this.setData({
        user_type:user_type
      });

    }else{
      wx.redirectTo({
        url: '/pages/login/login',
      });
      return;
    }
    
   
  },

	
  //机器扫描
  scanMem(imei) {
    let _this = this;
    wx.showLoading({
      title: '正在加载..',
    });
    request({
      url: 'selMach',
      data: {
        username: this.data.username,
        imei: imei
      }
    }).then(res => {
      wx.hideLoading();
      if(res.data.id){
       
        _this.setData({
          mechName:res.data.name,
          mechNo: res.data.no,
          mechPostTime:res.data.last_post_time,
          show: true
        });
      }else{
        wx.showToast({
          title: '二维码无效',
        });
      }
    });
  },
	
  // 扫码
  scanCode() {
    wx.scanCode({
      onlyFromCamera: true,
      success: res => {
        this.setData({
          imei: res.result.split("=")[1]
					
        });
        //机器扫描
        this.scanMem(res.result.split("=")[1]);
      }
    })
  },
	
	// 关闭弹窗
	closeDialog(){
		this.setData({
		  show:false
		});
	},


  loadOwnData(username) {
    request({
      url: 'loadOwnData',
      data: {
        username: username
      }
    }).then(res => {
      // console.log(res)
      if (res.statusCode == 200) {
        this.setData({
          myData: res.data
        })
      }
    });
  },

  ckVersion() {
    // 用户版本更新
    if (wx.canIUse("getUpdateManager")) {
      let updateManager = wx.getUpdateManager();
      // console.log(updateManager)
      updateManager.onCheckForUpdate((res) => {
        wx.showToast({
          title: '已是最新版本喽~~',
        })
      })
      updateManager.onUpdateReady(() => {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: (res) => {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            } else if (res.cancel) {
              return false;
            }
          }
        })
      })
      updateManager.onUpdateFailed(() => {
        // 新的版本下载失败
        wx.hideLoading();
        wx.showModal({
          title: '升级失败',
          content: '新版本下载失败，请检查网络！',
          showCancel: false
        });
      });
    }
  },
  toBuhuo() {
    wx.navigateTo({
      url: '/pages/lackJiqi/lackJiqi'
    })
  },
  toGuzhang() {
    wx.navigateTo({
      url: '/pages/guzhang/guzhang'
    })
  },
  toupdatePwd() {
    wx.navigateTo({
      url: '/pages/updatePwd/updatePwd'
    })
  },
  toEditUserInfo() {
    wx.navigateTo({
      url: '/pages/editUser/editUser'
    })
  },
  toExitLogin() {
    wx.removeStorageSync("userInfo");
    wx.removeStorageSync("initPwd");
    wx.redirectTo({
       url: '/pages/login/login'
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
    var username = wx.getStorageSync('userInfo').tel;
    this.loadOwnData(username);
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