export async function onRequestPost(context) {
    const requestData = await context.request.json()
    var currentVersionCode = 0
    
    if (requestData !== null || requestData !== undefined) {
        currentVersionCode = requestData.versionCode
    }

    const latestVersion = "3.0.9"
    const latestVersionCode = 202508261
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
                "content": "更新内容\n- 优化 使用体验",
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