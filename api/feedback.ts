import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method Not Allowed'
    });
  }

  const { type, functionModule, message, email, androidVersion, system, device, versionCode } = req.body;
  
  const api_key = process.env.RESENT;
  
  if (!message) {
    return res.status(400).json({
      success: false,
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
        subject: type,
        html: `<p><strong>功能模块:</strong> ${functionModule}</p>
               <p><strong>邮箱:</strong> ${email}</p>
               <p><strong>设备:</strong> Android ${androidVersion}；${system}；${device}</p>
               <p><strong>软件版本:</strong> ${versionCode}</p>
               <p><strong>内容:</strong><br>${message}</p>`
      })
    });

    if (result.ok) {
      return res.status(200).json({
        success: true,
        message: "提交成功，感谢您的反馈！"
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "提交失败，请稍后再试"
      });
    }
  } catch (error) {
    console.error('Error sending feedback:', error);
    return res.status(500).json({
      success: false,
      message: "发送反馈时出错"
    });
  }
}
