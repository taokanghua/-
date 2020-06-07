// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    idx:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeMenu(e){
      let index = e.target.dataset.index
      this.setData({
        idx: index
      })
      // 给父组件传值
      this.triggerEvent('tabsItemChange', {index})
    }
  }
})
