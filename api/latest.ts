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

  const latestVersion = "3.0.9";
  const latestVersionCode = 202509081;
  const isForceUpdate = false; // 是否强制更新
  
  const isNeedUpdate = currentVersionCode < latestVersionCode;
  const update = {
    "downloadUrl": "https://xubohan04.tk/SmartHNU_v3.0.9(202509081).apk",
    "content": "更新内容\n注意：更新该版本后，需要清楚软件数据。\n-新增 支持修改新闻页面字体样式\n- 优化 部分页面显示",
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
