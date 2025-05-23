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
        "url": "https://www.htu.edu.cn/"
      },
      {
        "name": "教务处",
        "url": "http://jwc.htu.edu.cn/"
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
