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

  const latestData = await getLatestVersionBody();
  const latestVersionName = latestData.name.split('_');

  let latestVersion: string = latestVersionName[1] || '';
  let latestVersionCode: number = parseInt(latestVersionName[2]) || 0;

  const isNeedUpdate = currentVersionCode < latestVersionCode;
  const isForceUpdate = false; // 是否强制更新
  
  const updateContent = {
    "downloadUrl": latestData.assets[0].browser_download_url,
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
      "update": isNeedUpdate ? updateContent : null,
    }
  };

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(data);
}

async function getLatestVersionBody() {
  const response = await fetch('https://api.github.com/repos/JiaLiFuNia/SmartHNU/releases/latest');
  const responseData = await response.json();
  return responseData;
}