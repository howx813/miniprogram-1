// index.js
Page({
  data: {
    inputText: '',
    imageUrl: '',
    isLoading: false,
    // 演示用的示例图片URL（使用更可靠的图片服务）
    demoImageUrls: [
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=600&h=400&fit=crop'
    ]
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

    // 模拟API调用延迟
    setTimeout(() => {
      // 随机选择一张演示图片
      const randomIndex = Math.floor(Math.random() * this.data.demoImageUrls.length);
      const randomImageUrl = this.data.demoImageUrls[randomIndex];
      
      // 更新状态，显示图片
      this.setData({
        imageUrl: randomImageUrl,
        isLoading: false
      });
      
      // 提示成功
      wx.showToast({
        title: '图片生成成功',
        icon: 'success'
      });
      
      // 注意：实际项目中，这里应该调用coze大模型API
      // 示例代码（后续需要替换为实际API）:
      /*
      wx.request({
        url: 'https://api.coze.com/generate-image',
        method: 'POST',
        data: {
          prompt: this.data.inputText
        },
        success: (res) => {
          this.setData({
            imageUrl: res.data.imageUrl,
            isLoading: false
          });
        },
        fail: (err) => {
          console.error('API调用失败', err);
          this.setData({
            isLoading: false
          });
          wx.showToast({
            title: '生成失败，请重试',
            icon: 'none'
          });
        }
      });
      */
    }, 1500); // 模拟1.5秒的API延迟
  }
})
