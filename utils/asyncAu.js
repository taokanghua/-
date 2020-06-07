export function getAddress(){
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}

export function getSetting() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export function getAuth() {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}