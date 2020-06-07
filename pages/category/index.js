// pages/category/index.js
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catList:[],
    leftList:[],
    rightList:[],
    curIndex:0,
    scrollTop:0
  },
  async getcat(){
    // 获取页面商品数据
    let res = await request({ url:'https://api-hmugo-web.itheima.net/api/public/v1/categories'})
    this.setData({
      catList: res.data.message
    })
    let left = this.data.catList.map(item=>item.cat_name)
    let right = this.data.catList[0].children
    this.setData({
      leftList:left,
      rightList:right
    })
  },
  changeItem(e){
    // 点击切换页面商品
    let index = this.data.catList[this.data.curIndex].children
    this.setData({
      curIndex: e.target.dataset.index,
      rightList: index,
      scrollTop:0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.getcat()
    
    // console.log(data)
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