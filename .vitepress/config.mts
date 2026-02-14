import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: "师韵-SmartHNU",
  description: "SmartHNU",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  vite: {
    plugins: [
      {
        name: 'pdf-proxy',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (!req.url?.startsWith('/api/pdf-proxy')) return next();
            const reqUrl = new URL(req.url, 'http://localhost');
            const pdfUrl = reqUrl.searchParams.get('url');
            if (!pdfUrl) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: "Missing 'url' query parameter" }));
              return;
            }
            fetch(pdfUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/pdf,*/*',
              },
              redirect: 'follow',
            })
              .then(async (response) => {
                if (!response.ok) {
                  res.writeHead(response.status, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: `Failed to fetch PDF: ${response.statusText}` }));
                  return;
                }
                const contentType = response.headers.get('content-type') || 'application/pdf';
                const headers: Record<string, string> = {
                  'Content-Type': contentType,
                  'Access-Control-Allow-Origin': '*',
                };
                const contentLength = response.headers.get('content-length');
                if (contentLength) headers['Content-Length'] = contentLength;
                const buffer = Buffer.from(await response.arrayBuffer());
                res.writeHead(200, headers);
                res.end(buffer);
              })
              .catch((err) => {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Failed to fetch PDF', details: String(err) }));
              });
          });
        },
      },
    ],
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '下载', link: '/download' },
      { text: '使用指南', link: '/usage' },
      { text: '致谢', link: '/thanks' },
      { text: '用户协议', link: '/user' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/JiaLiFuNia/SmartHNU' }
    ],
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    darkModeSwitchLabel: '外观',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    outline: {
      label: '目录'
    },
    footer: {
      message: ' Apache-2.0 Licensed',
      copyright: 'Copyright © 2024-2025 JiaLiFuNia & Xhand'
    },
    lastUpdated: {
      text: '上次更新',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    }
  }
})
