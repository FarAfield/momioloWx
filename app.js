// app.js
const AUTH = require('utils/auth')
App({
  onLaunch() {
    // 检测新版本
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    // 初始时检测网络状态
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType === 'none') {
          this.globalData.isConnected = false
          wx.showToast({
            title: '当前无网络',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    });
    // 监听网络状态的变化
    wx.onNetworkStatusChange(function (res) {
      if (!res.isConnected) {
        this.globalData.isConnected = false
        wx.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000
        })
      } else {
        this.globalData.isConnected = true
        wx.hideToast()
      }
    })
  },
  onShow() {
    // 自动登录
    AUTH.checkHasLogined(isLogined => {
      if(!isLogined){
        AUTH.login();
      }
    })
  },
  globalData: {
    isConnected: true,
  }
})
