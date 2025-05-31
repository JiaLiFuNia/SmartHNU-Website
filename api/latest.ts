import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const requestData = req.body;
  var currentVersionCode = 0;
  
  if (requestData !== null && requestData !== undefined) {
    currentVersionCode = requestData.versionCode;
  }

  const latestVersion = "3.0.9";
  const latestVersionCode = 202505312;
  const isForceUpdate = false; // 是否强制更新
  
  const isNeedUpdate = currentVersionCode < latestVersionCode;
  const update = {
    "downloadUrl": "https://xubohan04.tk/SmartHNU_v3.0.9(202505301).apk",
    "content": "更新内容\n- 新增 反馈页面\n- 新增 节假日信息获取\n- 新增 忘记密码提示弹窗\n- 新增 清除 Cookie 和 WebView 数据\n- 优化 更新检查体验",
  };

  const data = {
    "message": "success",
    "data": {
      "versionName": latestVersion,
      "versionCode": latestVersionCode,
      "isNeedUpdate": isNeedUpdate,
      "isForceUpdate": isForceUpdate,
      "update": isNeedUpdate ? update : null,
    }
  };

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(data);
}
