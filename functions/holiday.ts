export async function onRequestGet(context) {
    const url = new URL(context.request.url);
    let dateStr = url.searchParams.get('date');
    
    // 如果没有提供日期，使用今天的日期
    if (!dateStr) {
        const today = new Date();
        dateStr = today.toISOString().split('T')[0];
    }
    let date = new Date(dateStr);
    const year = date.getFullYear().toString();
    
    const holidayData = await getHolidayData(year);
    
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
    const formattedDate = date.toISOString().split('T')[0];
    
    let isOffDay = isWeekend;
    let holidayName = null;
    let message = null;
    
    if (holidayData && holidayData.days) {
        for (const day of holidayData.days) {
            if (day.date === formattedDate) {
                isOffDay = day.isOffDay;
                holidayName = day.name;
                message = day.description || "";
                break;
            }
        }
    }
    
    const weekDay = date.getDay();
    const weekDayNames = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const weekDayName = weekDayNames[weekDay];
    
    const holiday = holidayName ? {
        'isLieu': !isOffDay, // 调休
        'holiday': holidayName,
        'message': message
    } : null;
    
    const result = {
        "date": formattedDate,
        "holiday": holiday,
        "isOffDay": isOffDay,
        "name": weekDayName,
        "weekDay": weekDay === 0 ? 7 : weekDay
    };
    
    return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" }
    });
}

async function getHolidayData(year: String) {
    const url = "https://raw.githubusercontent.com/NateScarlet/holiday-cn/master/" + year + ".json"
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    const data = await response.json()
    return data
}