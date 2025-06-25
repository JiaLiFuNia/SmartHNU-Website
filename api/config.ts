import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  code: number;
  message: string;
  data: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const data = {
    "ac_cookie": ["295444bf-c1cf-458b-b041-b6cc36f07461", "2209553875734609932"],
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
