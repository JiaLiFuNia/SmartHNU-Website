export function onRequest(context) {
  const jsonResponse = Response.json(
    { name: "SmartHNU", version: "Release-2.1.8.1" },
  );
  logResponse(jsonResponse);
}