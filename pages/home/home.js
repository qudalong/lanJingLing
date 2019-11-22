import {
	request
} from '../../utils/request.js';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		mainData: '',
		array: [],
		totalMoney: 0,
		username: '',
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
		index_yys:0,
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

	// 经销商列表
	loadJxsList(username) {
		request({
			url: 'loadJxsList',
			data: {
				username: username
			}
		}).then(res => {
			if (res.statusCode == 200) {
				let data = res.data.jxs_user;
				data.forEach(item => {
					this.data.jxs.push(item.user)
				})
				this.setData({
					jxs: this.data.jxs,
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
				console.log(res.data);
				let data = res.data.yys_user;
				data.forEach(item => {
					this.data.yys.push(item.user)
				})
				this.setData({
					yys: this.data.yys,
					resulYys: data
				});
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

	bindPickerChangeJxs: function(e) {
		this.setData({
			index_jxs: e.detail.value
		});
		let target = this.data.jxs[this.data.index_jxs];
		let username = target.split('_')[1];
		let user_id = this.data.resultJxs.find(item => item.user == target).user_id;
		this.loadYysList(username, user_id); //根据经销商查询运营商列表
		this.loadMainData(username);
	},
  changeYys(){
		if(!this.data.yys.length){
			wx.showToast({
				title:"请先选择经销商",
				icon:'none'
			});
			return;
		}

  },
	bindPickerChangeYys: function(e) {
		this.setData({
			index_yys: e.detail.value
		});
		let target = this.data.yys[this.data.index_yys];
		let username = target.split('_')[1];
		this.loadMainData(username);
	},

	radioChange: function(e) {
		console.log('radio发生change事件，携带value值为：', e.detail.value)
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
