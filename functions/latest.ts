export async function onRequestPost(context) {
    const requestData = await context.request.json()
    var currentVersionCode = 0
    
    if (requestData !== null || requestData !== undefined) {
        currentVersionCode = requestData.versionCode
    }

    const latestVersion = "3.0.9"
    const latestVersionCode = 202505112
    const isForceUpdate = false // 是否强制更新
    const data = {
        "code": 200,
        "message": "success",
        "data": {
            "versionName": latestVersion,
            "versionCode": latestVersionCode,
            "isNeedUpdate": currentVersionCode < latestVersionCode,
            "isForceUpdate": isForceUpdate,
            "update": {
                "url": "",
                "content": "更新内容\n-新增 反馈页面\n-新增 节假日信息获取\n- 新增 忘记密码提示弹窗\n- 新增 清除 Cookie 和 WebView 数据\n- 优化 更新检查体验",
            }
        }
    }
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
}