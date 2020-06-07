// pages/cart/index.js
import { getAddress, getSetting, getAuth } from "../../utils/asyncAu.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allCheck: false,
    allNum: 0,
    allPrice: 0
  },

  async getLocalHandle() {
    // 获取用户信息
    // wx.getSetting({
    //   success:(result)=>{
    //     const addressAu = result.authSetting['scope.address']
    //     if(addressAu == true || addressAu == undefined){
    //       wx.chooseAddress({
    //         success:(res)=>{
    //           console.log(res)
    //         }
    //       })
    //     }else{
    //       //当用户曾经点过取消
    //       wx.openSetting({
    //         success:(res)=>{
    //           wx.chooseAddress({
    //             success:(res1)=>{
    //               console.log(res1)
    //             }
    //           })
    //         }
    //       })
    //     }
    //   }
    // })

    try {
      let setting = await getSetting()
      let scopeAdd = setting.authSetting["scope.address"]
      if (scopeAdd == false) {
        await getAuth()
      }
      let address = await getAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      wx.setStorageSync("address", address)
    }
    catch (err) {
      console.log(err)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // 获取用户地址
    let address = wx.getStorageSync('address') || {}
    //获取购物车信息
    // let cart = wx.getStorageSync('cart') || []
    //判断全选
    // let allCheck = true
    // //计算总价和数量
    // let allNum = 0
    // let allPrice = 0
    // cart.forEach(v=>{
    //   if(v.checked){
    //     allNum += v.num
    //     allPrice += v.num * v.goods_price
    //   }else{
    //     allCheck = false
    //   }
    // })
    this.setData({
      address
    })
    this.setCart()
  },
  //数据更新
  handleItemChange(e) {
    let id = e.currentTarget.dataset.id
    let obj = this.data.cart.findIndex(v => v.goods_id == id)
    this.data.cart[obj].checked = !this.data.cart[obj].checked
    wx.setStorageSync('cart', this.data.cart)
    this.setCart()
  },

  setCart() {
    let cart = wx.getStorageSync('cart') || []
    cart = cart.filter(v=>v.checked)
    let allCheck = true
    //计算总价和数量
    let allNum = 0
    let allPrice = 0
    cart.forEach(v => {
      if (v.checked) {
        allNum += v.num
        allPrice += v.num * v.goods_price
      } else {
        allCheck = false
      }
    })
    this.setData({
      cart,
      allCheck,
      allNum,
      allPrice
    })
  },
  buynow() {
    //购买
    console.log('666')

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