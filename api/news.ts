import { parseArticle } from './news/parser';
import type { ArticleData, ResponseData } from './news/parser';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const urlFromQuery = typeof req.query?.url === 'string' ? req.query.url : undefined;
    const urlFromBody = typeof (req.body as any)?.url === 'string' ? (req.body as any).url : undefined;
    const newsUrl = urlFromQuery || urlFromBody || '';

    console.log(`Parsing article from URL: ${newsUrl}`);

    const article = await parseArticle(newsUrl);
    const data = {
        code: article != null ? 200 : 404,
        message: article != null ? 'Success' : 'Parse error',
        article: article
    };

    res.setHeader('Content-Type', 'application/json');
    if (data.article != null) {
        return res.status(200).json(data as any);
    } else {
        return res.status(404).json(data as any);
    }
}