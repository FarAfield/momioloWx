// index.js
// 获取应用实例
const app = getApp()
const Request = require('../../utils/request')
Page({
  data: {
    notice: '', // 公告
    shopDetail: {}, // 店铺信息
    orderType: 'waibai', // waibai | ziqu
    categoryList: [], // 商品分类
    goodsList: [], // 分类下商品
    goodsCartList: [], // 购物车里的商品
    currentGood: {}, // 当前选择的商品
  },
  onLoad() {
    this.getNotice();
    this.getShopDetail();
    
  },
  onShow() {

  },
  // 获取公告
  getNotice() {
    Request.request({
      url: '/applets/notice/getData',
      method: 'GET',
      success: (data) => {
        this.setData({ notice: data.content })
      }
    })
  },
  // 获取店铺详情
  getShopDetail() {
    Request.request({
      url: '/applets/shopDetail/getData',
      method: 'GET',
      success: (data) => {
        this.setData({ shopDetail: data })
      }
    })
  },
  // 查询商品分类
  getCategory() {
    Request.request({
      url: '/applets/category/getData',
      method: 'GET',
      success: (data) => {
        this.setData({ categoryList: data })
        if (data.length) {
          this.getGoodsByCategory(data[0].id)
        }
      }
    })
  },
  // 查询分类下商品
  getGoodsByCategory(categoryId) {
    Request.request({
      url: '/applets/goodsByCategory/getData',
      data: {
        sourcePath: 'goodsByCategory',
        categoryId,
      },
      method: 'GET',
      success: (data) => {
        this.setData({ goodsList: data })
      }
    })
  },

  goToDetail() {
    console.log('111')
    wx.login({
      success:res => {
        console.log(res);
      }
    })
  }


})



