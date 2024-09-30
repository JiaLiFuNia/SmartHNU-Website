<script setup>
import { data } from './release.data.js'
</script>

# 下载<Badge type="tip">{{ data['name'] }}</Badge>

* [GitHub Release](https://github.com/JiaLiFuNia/SmartHNU/releases/latest)
* [123云盘](https://www.123pan.com/s/uyHuVv-dTdjH)（推荐使用）

## 意见反馈
邮件地址：<smarthnu@proton.me>

## 更新日志
**版本号：{{ data['name'] }}**

**更新日期：{{ data['published_at'] }}**

### 更新内容：

{{ data['body'] }}