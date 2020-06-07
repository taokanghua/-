// pages/good_detail/index.js
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async getGoodsDetail(id){
    let res = await request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail' }, {...id})
    this.setData({
      goodsDetail: res.data.message
    })
  },
  previewImg(e){
    // 照片预览
    let src = e.currentTarget.dataset.src
    let urls = this.data.goodsDetail.pics.map(item => item.pics_mid)
    wx.previewImage({
      urls,
      current:src
    })
  },
  addCartHandle(){
    // 加入购物车
    let cart = wx.getStorageSync("cart")||[]
    let index = cart.findIndex(item=>item.goods_id == this.data.goodsDetail.goods_id) 
    if(index === -1){
      // 没找到
      this.data.goodsDetail.num = 1
      this.data.goodsDetail.checked = true
      cart.push(this.data.goodsDetail)
    }else{
      cart[index].num++
    }
    wx.setStorageSync("cart", cart)
    wx.showToast({
      title: '添加购物车成功!',
      mask:true
    })
  },
  onLoad: function (options) {
    // console.log(options)
    this.getGoodsDetail(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})