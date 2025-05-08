export function onRequest(context) {
    return new Response(JSON.stringify(""), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
}