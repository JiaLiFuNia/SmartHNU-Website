export function onRequest(context) {
  const jsonResponse = Response.json(
    { nmae: "SmartHNU", version: "Release-2.1.8.1" },
  );
  logResponse(jsonResponse);
}