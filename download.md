<script setup>
import { ref, onMounted } from 'vue';

// 定义响应式变量来存储 GitHub release 数据
const releaseData = ref({
  name: 'loading...',
  published_at: 'loading...',
  body: 'loadind...'
});

// 使用 onMounted 在页面加载时执行 GET 请求
onMounted(async () => {
  try {
    const response = await fetch('https://api.github.com/repos/JiaLiFuNia/SmartHNU/releases/latest');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // 更新响应式变量中的数据
    releaseData.value = {
      name: data.tag_name,
      published_at: data.published_at,
      body: data.body
    };
  } catch (error) {
    console.error('Error fetching release data:', error);
  }
});
</script>

# 下载<Badge type="tip">{{ releaseData.name }}</Badge>

* [GitHub Release](https://github.com/JiaLiFuNia/SmartHNU/releases/latest)
* [123云盘](https://www.123pan.com/s/uyHuVv-dTdjH)（推荐使用）

## 意见反馈
邮件地址：<smarthnu@proton.me>

## 更新日志
**版本号：{{ releaseData.name }}**

**更新日期：{{ releaseData.published_at }}**

### 更新内容：

{{ releaseData.body }}
