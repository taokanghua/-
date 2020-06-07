let ajaxNum = 0
export const request = (params, p) =>{
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中...',
    })
    ajaxNum ++
    let pa = '?'
    if(p){
      for(let i in p){
        pa +=  i + '=' +p[i]+'&'
      }
      params.url = params.url + pa
      // console.log(params.url)
    }
    wx.request({
      ...params,
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      },
      complete:() =>{
        ajaxNum --
        if(ajaxNum == 0){
          wx.hideLoading()
        }
      }
    })
  })
}