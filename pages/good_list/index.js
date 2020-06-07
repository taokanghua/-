// pages/good_list/index.js
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'综合'
      },
      {
        id: 1,
        value: '销量'
      },
      {
        id: 2,
        value: '价格'
      },
    ],
    index:0,
    goodsList:[],
    curPage:1
  },
  params:{
    query:'',
    cid:'',
    pagenum: 1,
    pagesize: 10
  },
  async getGoodsList(){
    let res = await request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search'}, this.params)
    this.setData({
      goodsList: [...this.data.goodsList, ...res.data.message.goods]
    })
    wx.stopPullDownRefresh()
  },

  tabsChange(e){
    let {index} = e.detail
    this.setData({
      index
    })
    // console.log(this.data.index)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取链接参数
    // console.log(options)
    this.params.cid = options.cid
    this.getGoodsList()
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
    // console.log('xia laaa')
    this.setData({
      goodsList:[]
    })
    this.params.pagenum = 1
    this.curPage = 1
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.curPage != this.data.goodsList.length){
      this.params.pagenum++
      this.getGoodsList()
    }else{
      wx:wx.showToast({
        title: '已经到底了!',
        duration: 2500
      })
    }
    this.curPage = this.data.goodsList.length
  },

  /**
   * 用户点击右上角分享
   */
  
  onShareAppMessage: function () {

  }
  
})