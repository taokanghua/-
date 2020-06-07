// pages/cart/index.js
import { getAddress, getSetting, getAuth} from "../../utils/asyncAu.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allCheck:false,
    allNum:0,
    allPrice:0
  },

  async getLocalHandle(){
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

    try{
      let setting = await getSetting()
      let scopeAdd = setting.authSetting["scope.address"]
      if (scopeAdd == false) {
        await getAuth()
      }
      let address = await getAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      wx.setStorageSync("address", address)
    }
    catch(err){
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
  handleItemChange(e){
    let id = e.currentTarget.dataset.id
    let obj = this.data.cart.findIndex(v=>v.goods_id == id)
    this.data.cart[obj].checked = !this.data.cart[obj].checked
    wx.setStorageSync('cart', this.data.cart)
    this.setCart()
  },
  //全选
  handleItemAllChange(){
    let {cart, allCheck} = this.data
    allCheck = !allCheck
    cart.forEach(v=>v.checked = allCheck)
    wx.setStorageSync('cart', cart)
    this.setData({
      allCheck,
      cart
    })
    this.setCart()
  },
  // 加减
  handleNumEdit(e){
    let { operation, id} = e.currentTarget.dataset
    // console.log(operation, id)
    let {cart} = this.data
    let index = cart.findIndex(v=>v.goods_id == id)
    if(cart[index].num == 1 && operation == -1){
      wx.showModal({
        title: '提示',
        content: '确定删除该商品?',
        success:(res)=>{
          if (res.confirm) {
            cart.splice(index, 1)
            wx.setStorageSync('cart', cart)
            this.setCart()
          }
        }
      })
    } else {
      cart[index].num = parseInt(cart[index].num) + parseInt(operation)
    }
    wx.setStorageSync('cart', cart)
    this.setCart()
  },
  setCart(){
    let cart = wx.getStorageSync('cart') || []
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
  buynow(){
    //购买
    const {address, allNum} = this.data
    if(allNum === 0){
      wx.showToast({
        title: '你还没有选购商品哦!',
        icon: 'none'
      })
      return
    }else if(!address.userName){
      wx.showToast({
        title: '请选择收货地址哦!',
        icon:'none'
      })
      return
    }else{
      wx.redirectTo({
        url: '/pages/pay/index'
      })
    }

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