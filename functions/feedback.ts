export async function onRequestPost(context) {
    const { type, functionModule, message, email, androidVersion, system, device, versionCode } = await context.request.json();
    const api_key = context.env.RESENT;
    if (!message) {
        return new Response(JSON.stringify({ success: false, message: "反馈不能为空" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }

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
    console.log(result);

    if (result.ok) {
        return new Response(JSON.stringify({ success: true, message: "提交成功" }), {
            headers: { "Content-Type": "application/json" }
        });
    } else {
        return new Response(JSON.stringify({ success: false, message: "提交失败，请稍后再试" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
