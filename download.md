---
layout: doc
---

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { marked } from 'marked';

// 定义前端展示用的数据接口
interface ReleaseDisplayData {
  name: string;
  published_at: string;
  body: string;
}

// 定义 API 返回的数据接口（与后端 payload 对应）
interface ApiResponse {
  tag_name: string;
  published_at: string;
  body: string;
}

// 使用泛型定义 ref
const releaseData = ref<ReleaseDisplayData | null>(null);
const errorMsg = ref<string>('');
const loading = ref<boolean>(true);

const formatDate = (isoString: string): string => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  });
};

onMounted(async () => {
  try {
    // 请求我们自己的 Vercel API
    const response = await fetch('/api/release');
    
    if (!response.ok) {
      throw new Error('无法连接到版本服务');
    }
    
    const data = (await response.json()) as ApiResponse;

    // 转换数据
    releaseData.value = {
      name: data.tag_name,
      published_at: formatDate(data.published_at),
      // 这里的 parse 返回可能是 Promise 或 string，视 marked 版本而定，
      // 简单起见强制转换为 string，但在严格环境下最好 await 这里的 parse
      body: await marked.parse(data.body) 
    };
  } catch (error) {
    console.error(error);
    errorMsg.value = '获取版本信息失败，请检查网络或稍后重试。';
  } finally {
    loading.value = false;
  }
});
</script>

<div v-if="loading">
  ⏳ 正在检查更新...
</div>

<div v-else-if="errorMsg" class="danger custom-block">
  <p class="custom-block-title">错误</p>
  <p>{{ errorMsg }}</p>
  <p><a href="https://github.com/JiaLiFuNia/SmartHNU/releases/latest" target="_blank">直接访问 GitHub 查看 &rarr;</a></p>
</div>

<div v-else-if="releaseData">

# 下载 <Badge type="tip">{{ releaseData.name }}</Badge>

* [GitHub Release](https://github.com/JiaLiFuNia/SmartHNU/releases/latest)
* [123云盘](https://www.123pan.com/s/uyHuVv-dTdjH)

## 意见反馈
邮件地址：<xbh0704@outlook.com>

## 更新日志
**版本号：** {{ releaseData.name }}  
**更新日期：** {{ releaseData.published_at }}

### 更新内容：
<div class="update-content" v-html="releaseData.body"></div>

</div>

<style>
.update-content ul { padding-left: 1.2em; }
.update-content li { margin-bottom: 4px; }
</style>