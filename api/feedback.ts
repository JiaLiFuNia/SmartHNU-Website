import type { VercelRequest, VercelResponse } from '@vercel/node';

type ResponseData = {
  code: number;
  message: string;
  data: boolean;
};

type FeedbackRequest = {
  type: string;
  functionModule: string;
  message: string;
  email: string;
  androidVersion: string;
  system: string;
  device: string;
  versionCode: string;
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      code: 405,
      data: false, 
      message: 'Method Not Allowed'
    });
  }

  const feedback = req.body as FeedbackRequest;
  
  const api_key = process.env.RESENT;
  
  if (!feedback.message) {
    return res.status(400).json({
      code: 400,
      data: false,
      message: "反馈不能为空"
    });
  }

  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${api_key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "SmartHNU_Feedback@resend.dev",
        to: "xbh0704@outlook.com",
        subject: feedback.type,
        html: `<p><strong>邮箱:</strong> ${feedback.email}</p>
               <p><strong>设备:</strong> Android ${feedback.androidVersion}；${feedback.system}；${feedback.device}</p>
               <p><strong>软件版本:</strong> ${feedback.versionCode}</p>
               <p><strong>内容:</strong><br>${feedback.message}</p>`
      })
    });

    if (result.ok) {
      return res.status(200).json({
        code: 200,
        data: true,
        message: "提交成功，感谢您的反馈！"
      });
    } else {
      return res.status(500).json({
        code: 500,
        data: false,
        message: "提交失败，请稍后再试"
      });
    }
  } catch (error) {
    console.error('Error sending feedback:', error);
    return res.status(500).json({
      code: 500,
      data: false,
      message: "发送反馈时出错"
    });
  }
}
