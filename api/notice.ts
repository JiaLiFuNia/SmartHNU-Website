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
      "id": 2026012901,
      "publishTime": "2026-01-29 12:00",
      "expireTime": "2026-02-28 23:59",
      "title": "新年快乐！",
      "content": "祝大家新年快乐，学业进步！",
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