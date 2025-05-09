export async function onRequestPost(context, env) {
    const { type, function_model, message, email, android_version, system, device, versionCode } = await context.request.json();

    if (!message) {
        return new Response(JSON.stringify({ success: false, message: "反馈不能为空" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }

    const result = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${env.RESENT}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            from: "SmartHNU_Feedback@resend.dev",
            to: "xbh0704@outlook.com",
            subject: type,
            html: `<p><strong>功能模块:</strong> ${function_model}</p>
               <p><strong>邮箱:</strong> ${email}</p>
                <p><strong>设备:</strong> ${android_version} ${system} ${device}</p>
                <p><strong>软件版本:</strong> ${versionCode}</p>
               <p><strong>内容:</strong><br>${message}</p>`
        })
    });
    console.log(result);

    if (result.ok) {
        return new Response(JSON.stringify({ success: true, message: "发送成功" }), {
            headers: { "Content-Type": "application/json" }
        });
    } else {
        return new Response(JSON.stringify({ success: false, message: "发送失败，请稍后再试" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
