export function onRequest(context) {
    const data = {
        "ac_cookie": ["295444bf-c1cf-458b-b041-b6cc36f07461", "2209553875734609932"],
        "website_navigation": [
            {
                "name": "河南师范大学",
                "url": "https://www.htu.edu.cn/"
            },
            {
                "name": "教务处",
                "url": "http://jwc.htu.edu.cn/"
            }
        ]
    };
    return new Response(JSON.stringify({
        "code": 200,
        "message": "success",
        "data": data,
    }), {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
}