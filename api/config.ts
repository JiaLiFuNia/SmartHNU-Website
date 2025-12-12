import type { VercelRequest, VercelResponse } from '@vercel/node';

type ResponseData = {
  code: number;
  message: string;
  data: Data;
};

type WebsiteNavigation = {
  name: string;
  url: string;
  description: string;
}

type Data = {
  ac_cookie: string[];
  website_navigation: WebsiteNavigation[];
}

export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const data: Data = {
    "ac_cookie": ["cb1c44f8-f07c-4ccc-8a91-7c898b66eb6f", "2209553875734609932"],
    "website_navigation": [
      {
        "name": "河南师范大学",
        "url": "https://www.htu.edu.cn/",
        "description": "河南师范大学官网"
      },
      {
        "name": "教务处",
        "url": "https://www.htu.edu.cn/teaching/main.htm",
        "description": "河南师范大学教务处"
      },
      {
        "name": "正版软件管理与服务平台",
        "url": "https://ms.htu.edu.cn",
        "description": "正版软件管理与服务平台"
      },
      {
        "name": "就业创业信息网",
        "url": "https://jc.htu.edu.cn/p/page/index.html",
        "description": "河南师范大学就业创业信息网"
      },
      {
        "name": "河南师范大学工具站",
        "url": "https://hackhtu.pages.dev",
        "description": "河南师范大学工具站"
      },
      {
        "name": "师大版 DeepSeek",
        "url": "https://chat.htu.edu.cn/",
        "description": "师大版 DeepSeek AI 助手"
      },
      {
        "name": "修改密码",
        "url": "https://authserver2.htu.edu.cn/personalInfo/personalMobile/index.html#/setPassword",
        "description": "i 师大修改密码"
      }
    ]
  };
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    "code": 200,
    "message": "success",
    "data": data,
  });
}
