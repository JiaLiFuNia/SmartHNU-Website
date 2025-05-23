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
  let dateStr = req.query.date as string;
  
  // 如果没有提供日期，使用今天的日期
  if (!dateStr) {
    const today = new Date();
    dateStr = today.toISOString().split('T')[0];
  }
  
  let date = new Date(dateStr);
  // 如果日期无效，使用今天的日期
  if (isNaN(date.getTime())) {
    date = new Date();
    dateStr = date.toISOString().split('T')[0];
  }
  
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
  
  const data = {
    "code": 200,
    "message": "success",
    "data": result
  };

  res.status(200).json(data);
}

async function getHolidayData(year: string) {
  const url = "https://raw.githubusercontent.com/NateScarlet/holiday-cn/master/" + year + ".json";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });
  const data = await response.json();
  return data;
}
