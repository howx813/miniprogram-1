Component({
  options: {
    multipleSlots: true
  },
  properties: {
    title: {
      type: String,
      value: ''
    },
    background: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: ''
    },
    back: {
      type: Boolean,
      value: true
    },
    loading: {
      type: Boolean,
      value: false
    }
  },
  data: {
    statusBarHeight: 0,
    navBarHeight: 0,
    menuButtonInfo: null,
    ios: false
  },
  lifetimes: {
    attached() {
      try {
        // 使用新API获取系统信息
        const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
        const windowInfo = wx.getWindowInfo()
        const appBaseInfo = wx.getAppBaseInfo()
        
        const isAndroid = appBaseInfo.platform === 'android'
        
        this.setData({
          statusBarHeight: windowInfo.statusBarHeight,
          menuButtonInfo: menuButtonInfo,
          ios: !isAndroid,
          navBarHeight: (menuButtonInfo.top - windowInfo.statusBarHeight) * 2 + menuButtonInfo.height
        })
      } catch (error) {
        console.error('获取系统信息失败', error)
        // 兼容处理
        const systemInfo = wx.getSystemInfoSync()
        const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
        
        this.setData({
          statusBarHeight: systemInfo.statusBarHeight,
          menuButtonInfo: menuButtonInfo,
          ios: systemInfo.platform !== 'android',
          navBarHeight: (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height
        })
      }
    }
  },
  methods: {
    back() {
      wx.navigateBack({
        delta: 1
      })
      this.triggerEvent('back')
    }
  }
}) 