import { onRequestPost as __feedback_ts_onRequestPost } from "D:\\MY\\师韵\\SmartHNU-Website\\functions\\feedback.ts"
import { onRequestGet as __holiday_ts_onRequestGet } from "D:\\MY\\师韵\\SmartHNU-Website\\functions\\holiday.ts"
import { onRequestPost as __latest_ts_onRequestPost } from "D:\\MY\\师韵\\SmartHNU-Website\\functions\\latest.ts"
import { onRequest as __notice_ts_onRequest } from "D:\\MY\\师韵\\SmartHNU-Website\\functions\\notice.ts"

export const routes = [
    {
      routePath: "/feedback",
      mountPath: "/",
      method: "POST",
      middlewares: [],
      modules: [__feedback_ts_onRequestPost],
    },
  {
      routePath: "/holiday",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__holiday_ts_onRequestGet],
    },
  {
      routePath: "/latest",
      mountPath: "/",
      method: "POST",
      middlewares: [],
      modules: [__latest_ts_onRequestPost],
    },
  {
      routePath: "/notice",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__notice_ts_onRequest],
    },
  ]