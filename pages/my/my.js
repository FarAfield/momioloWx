// pages/my/my.js
const Request = require('../../utils/request');
const AUTH = require('../../utils/auth')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, // 微信用户基础信息
    userDetail: {
      bg: 'https://dcdn.it120.cc/2020/08/01/252f429e-1a7f-4bc6-9e06-92b210c437b4.png'
    }, // 用户详细信息（非微信保存）
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    AUTH.checkHasLogined(isLogined => {
      // 已登陆
      if (isLogined) {
        const userInfo = wx.getStorageSync("userInfo");
        const token = wx.getStorageSync("token");
        this.setData({ userInfo });
        Request.request({
          url: 'xxx',
          method: 'POST',
          token,
          success: data => {
            // mock
            this.setData({
              uesrDetail: {
                bg: 'https://dcdn.it120.cc/2020/08/01/252f429e-1a7f-4bc6-9e06-92b210c437b4.png'
              }
            })
          }
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ userInfo:{}})
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 一键登陆
  register(e) {
    const { detail: { userInfo } } = e;
    this.setData({ userInfo })
   AUTH.register();
    // AUTH.login();
  }
})