import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  code: number;
  message: string;
  data: appVersion;
  captchaModelVersion: captchaModelVersion;
};

type appVersion = {
  versionName: string;
  versionCode: number;  
  isNeedUpdate: boolean;
  isForceUpdate: boolean;
  update: {
    downloadUrl: string;
    content: string;
  } | null;
};

type captchaModelVersion = {
  versionName: string;
  versionCode: number;
  downloadUrl: string;
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
  const latestCaptchaModelData = await getLatestCaptchaModelBody();
  const latestVersionName = latestData.name.split('_');

  let latestVersion: string = latestVersionName[0] || '';
  let latestVersionCode: number = parseInt(latestVersionName[1]) || 0;

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
    },
    "captchaModelVersion": {
      "versionName": latestCaptchaModelData.versionName,
      "versionCode": latestCaptchaModelData.versionCode,
      "downloadUrl": "https://raw.githubusercontent.com/JiaLiFuNia/SmartHNU/refs/heads/v3/src/captcha.traineddata"
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

async function getLatestCaptchaModelBody() {
  const response = await fetch('https://raw.githubusercontent.com/JiaLiFuNia/SmartHNU/refs/heads/v3/src/captcha.json');
  const responseData = await response.text();
  return JSON.parse(responseData);
}