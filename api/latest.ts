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

  const latestVersion = "3.0.9.2";
  const latestVersionCode = 202510042;
  const isForceUpdate = false; // 是否强制更新
  
  const isNeedUpdate = currentVersionCode < latestVersionCode;
  const latestData = await getLatestVersionBody();
  const update = {
    "downloadUrl": "https://xubohan04.tk/SmartHNU_v3.0.9.2(202510041).apk",
    "content": latestData.body,
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

async function getLatestVersionBody() {
  // https://api.github.com/repos/JiaLiFuNia/SmartHNU/releases/latest
  const response = await fetch('https://api.github.com/repos/JiaLiFuNia/SmartHNU/releases/latest');
  const responseData = await response.json();
  return responseData;
}