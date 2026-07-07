import type { VercelRequest, VercelResponse } from '@vercel/node';

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
  req: VercelRequest,
  res: VercelResponse
) {
  const requestData = req.body as any;
  var currentVersionCode = 0;
  
  if (requestData !== null && requestData !== undefined) {
    currentVersionCode = requestData.versionCode;
  }

  const latestData = await getLatestVersionBody();
  const latestVersionName = latestData.name.split('_');

  let latestVersion: string = latestVersionName[0] || '';
  let latestVersionCode: number = parseInt(latestVersionName[1]) || 0;

  const isNeedUpdate = currentVersionCode < latestVersionCode;
  const isForceUpdate = false; // 是否强制更新
  
  const rawBody = latestData.body.replace(/[#\r]/g, '');
  const bodyLines = rawBody.split('\n');
  const truncatedBody = bodyLines.length > 10
    ? bodyLines.slice(0, 10).join('\n') + '\n...\n可前往 GitHub 查看全部日志'
    : rawBody;

  const updateContent = {
    "downloadUrl": latestData.assets[0].browser_download_url,
    "content": truncatedBody,
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