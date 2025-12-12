import type { VercelRequest, VercelResponse } from '@vercel/node';

// 定义我们关心的 GitHub API 返回结构
interface GitHubRelease {
  tag_name: string;
  published_at: string;
  body: string;
  [key: string]: any; // 允许其他未知字段
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    // 请求 GitHub API
    const ghRes = await fetch('https://api.github.com/repos/JiaLiFuNia/SmartHNU/releases/latest');
    
    if (!ghRes.ok) {
      throw new Error(`GitHub API responded with ${ghRes.status}`);
    }

    const data = (await ghRes.json()) as GitHubRelease;
    
    // 设置缓存：s-maxage=3600 (CDN缓存1小时), stale-while-revalidate (后台更新)
    response.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    
    // 只返回前端需要的字段，减少传输体积
    const payload = {
      tag_name: data.tag_name,
      published_at: data.published_at,
      body: data.body
    };

    return response.status(200).json(payload);

  } catch (error) {
    console.error('API Error:', error);
    return response.status(500).json({ error: 'Failed to fetch release data' });
  }
}