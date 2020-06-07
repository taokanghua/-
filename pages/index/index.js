import { request } from "../../request/index.js"

Page({
  data:{
    swiperList:[],
    menuList:[],
    floorList:[]
  },
  onLoad:function(){
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success:(res) => {
    //     this.setData({
    //       swiperList: res.data.message
    //     })
    //   }
    // })
    this.getSwiper()
    this.getMenu()
    this.getFloor()
  },
  async getSwiper(){
    let res = await request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata' })
    this.setData({
      swiperList: res.data.message
    })
  },
  async getMenu(){
    let res = await request({ url:'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'})
    this.setData({
      menuList: res.data.message
    })
  },
  async getFloor(){
    let res = await request({ url:'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'})
    this.setData({
      floorList: res.data.message
    })
  }
})
