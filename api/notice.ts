import type { VercelRequest, VercelResponse } from '@vercel/node';

type ResponseData = {
  code: number;
  message: string;
  data: any;
};

type NoticeData = {
  id: number;
  publishTime: string;
  expireTime: string;
  title: string;
  content: string;
  action: string | null;
  type: "URL" | "SCREEN" | "COMMON" | "UPDATE" | "QUESTIONNAIRE";
}

export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const notices: NoticeData[] = [
    {
      "id": 2027070601, 
      "publishTime": "2026-07-06 00:00",
      "expireTime": "2026-09-01 00:00",
      "title": "暑假放假通知",
      "content": "暑假放假时间为7月6日-9月7日。祝大家假期愉快！",
      "action": null,
      "type": "COMMON"
    }
  ];

  const data: ResponseData = {
    "code": 200,
    "message": "success",
    "data": notices
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(data);
}