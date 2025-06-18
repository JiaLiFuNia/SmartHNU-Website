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
    "ac_cookie": ["cb1c44f8-f07c-4ccc-8a91-7c898b66eb6f", "2209553875734609932"],
    "website_navigation": [
      {
        "name": "河南师范大学",
        "url": "https://www.htu.edu.cn/"
      },
      {
        "name": "教务处",
        "url": "https://www.htu.edu.cn/teaching/main.htm"
      },
      {
        "name": "正版软件管理与服务平台",
        "url": "https://ms.htu.edu.cn"
      },
      {
        "name": "就业创业信息网",
        "url": "https://jc.htu.edu.cn/p/page/index.html"
      },
      {
        "name": "河南师范大学工具站",
        "url": "https://hackhtu.pages.dev"
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
