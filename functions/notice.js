export function getNotices(request) {
    const notices = [
        {
            "id": 2025050401,
            "time": "2025-5-4 10:00",
            "title": "软件通知",
            "content": "师韵（SmartHNU）v3.0 即将来袭",
            "action": null,
            "type": "COMMON"
        },
        {
            "id": 2025021401,
            "time": "2025-2-14 22:28",
            "title": "新增页面",
            "content": "新增 课程成绩",
            "action": "grade",
            "type": "SCREEN"
        },
        {
            "id": 2025021201,
            "time": "2025-2-12 17:45",
            "title": "软件通知",
            "content": "优化 设置页面",
            "action": "setting",
            "type": "SCREEN"
        },
        {
            "id": 2025012301,
            "time": "2025-1-23 12:14",
            "title": "软件通知",
            "content": "师韵——集教务与新闻于一体的校园助手。",
            "action": null,
            "type": "COMMON"
        },
        {
            "id": 2025012302,
            "time": "2025-1-23 12:15",
            "title": "校园通知",
            "content": "河南师范大学",
            "action": "https://www.htu.edu.cn/",
            "type": "URL"
        }
    ];

    return notices;
}