import { getNotices } from './notice.js';

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		if (url.pathname === '/notice') {
			const data = getNotices(request);
			return new Response(JSON.stringify(data), {
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			});
		}

		return new Response('Hello World!');
	},
};
