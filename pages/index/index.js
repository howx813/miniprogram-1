// index.js
Page({
  data: {
    inputText: '',
    imageUrl: '',
    isLoading: false,
    // 已移除演示图片配置
  },

  onInputChange(e) {
    this.setData({
      inputText: e.detail.value
    });
  },

  generateImage() {
    // 检查输入是否为空
    if (!this.data.inputText.trim()) {
      wx.showToast({
        title: '请输入描述文字',
        icon: 'none'
      });
      return;
    }

    // 显示加载状态
    this.setData({
      isLoading: true,
      imageUrl: ''
    });

    // 调用coze大模型API
    const data = {
      parameters: {
        input: this.data.inputText.trim()
      },
      workflow_id: '7480393467706540071'
    };
    console.log('请求参数:', data);
    wx.request({
        url: 'https://api.coze.cn/v1/workflow/run',
        method: 'POST',
        header: {
          'Authorization': 'Bearer pat_7ql5yqGT4wMYzWehAQfA8jMWWasvVSMMS6cEJk4x0DHgcOQcf6PKGMf5usl0rAHU',
          'Content-Type': 'application/json'
        },
        data: {
          parameters: {
            input: this.data.inputText.trim() // 修改参数名为input
          },
          workflow_id: '7480393467706540071'
        },
        success: (res) => {
          console.log('完整API响应:', res);
          try {
            const responseData = JSON.parse(res.data.data);
            if (res.data.code === 0 && responseData?.output) {
              this.setData({
                imageUrl: responseData.output,
                isLoading: false
              });
              wx.showToast({ title: '生成成功', icon: 'success' });
            } else {
              throw new Error('API返回数据异常: ' + JSON.stringify(res.data));
            }
          } catch (error) {
            console.error('数据处理失败:', error);
            this.setData({ isLoading: false });
            wx.showToast({ title: '生成失败，数据异常', icon: 'none' });
          }
        },
        fail: (err) => {
          console.error('API调用失败', '错误详情:', err.errMsg, '状态码:', err.statusCode);
          this.setData({ isLoading: false });
          wx.showToast({ title: '生成失败，请重试', icon: 'none' });
        }
      });

  }
})
