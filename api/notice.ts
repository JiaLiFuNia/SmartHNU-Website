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
  const notices = [
{
      "id": 2025092901,
      "time": "2025-9-29 12:00",
      "title": "调休通知",
      "content": "10月1日至8日放假调休，共8天。9月28日（星期日）、10月11日（星期六）上班上课。9月28日的教学安排按10月7日(第6周，星期二)课表执行；10月11日的教学安排按10月8日(第6周，星期三)课表执行。",
      "action": "https://www.htu.edu.cn/2025/0918/c8955a355337/page.htm",
      "type": "URL"
    },
{
      "id": 2025092902,
      "time": "2025-9-29 12:00",
      "title": "作息调整",
      "content": "自10月9日起执行秋季作息时间。",
      "action": null,
      "type": "COMMON"
    },
    {
      "id": 2025090801,
      "time": "2025-9-8 12:00",
      "title": "新学期，新气象",
      "content": "欢迎 25 级新同学",
      "action": null,
      "type": "COMMON"
    },
    {
      "id": 2025051101,
      "time": "2025-5-11 12:00",
      "title": "新增页面",
      "content": "新增 反馈页面\n你可以在这里提交你的意见和建议",
      "action": "feedback",
      "type": "SCREEN"
    },
    {
      "id": 2025050401,
      "time": "2025-5-4 10:00",
      "title": "软件通知",
      "content": "师韵（SmartHNU）v3.0 即将来袭",
      "action": null,
      "type": "COMMON"
    },
    {
      "id": 2025012301,
      "time": "2025-1-23 12:14",
      "title": "软件通知",
      "content": "师韵——集教务与新闻于一体的校园助手。",
      "action": null,
      "type": "COMMON"
    },
    {
      "id": 2025012302,
      "time": "2025-1-23 12:15",
      "title": "校园通知",
      "content": "河南师范大学",
      "action": "https://www.htu.edu.cn/",
      "type": "URL"
    }
  ];

  const data = {
    "code": 200,
    "message": "success",
    "data": notices
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(data);
}
