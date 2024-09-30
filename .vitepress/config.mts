import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "师韵-SmartHNU",
  description: "SmartHNU",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '下载', link: '/download' },
      { text: '致谢', link: '/thanks' },
      { text: '使用指南', link: '/function' },
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
      message: 'MIT Licensed',
      copyright: 'Copyright © 2024 JiaLiFuNia & Xhand'
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
