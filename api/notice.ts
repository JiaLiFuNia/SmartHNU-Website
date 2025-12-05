import type { NextApiRequest, NextApiResponse } from 'next';

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
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const notices: NoticeData[] = [
{
      "id": 2025112701,
      "publishTime": "2025-11-27 12:00",
      "expireTime": "2025-12-27 12:00",
      "title": "软件通知",
      "content": "留言板应用接口调整，暂无法获取信息，待后续修复。",
      "action": null,
      "type": "COMMON"
    },
    {
      "id": 2025120501,
      "publishTime": "2025-12-05 12:00",
      "expireTime": "2026-12-05 12:00",
      "title": "使用调查",
      "content": "你认为首页都需要展示什么数据？",
      "action": "https://v.wjx.cn/vm/rsn1ARu.aspx",
      "type": "URL"
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