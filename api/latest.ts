import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  code: number;
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

  const latestVersion = "3.0.9.1";
  const latestVersionCode = 202509111;
  const isForceUpdate = false; // 是否强制更新
  
  const isNeedUpdate = currentVersionCode < latestVersionCode;
  const update = {
    "downloadUrl": "https://xubohan04.tk/SmartHNU_v3.0.9.1(202509111).apk",
    "content": "更新内容\n- 新增 统一认证系统登录逻辑\n- 新增 空闲教室可查询增加更多教室\n- 修复 课表日期显示错误的问题",
  };

  const data = {
    "code": 200,
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
