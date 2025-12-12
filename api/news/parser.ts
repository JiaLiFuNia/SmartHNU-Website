import { JSDOM } from 'jsdom';

export interface ResponseData {
    code: number;
    message: string;
    article: ArticleData | null;
}

export interface ArticleData {
    title: string;
    articleContent: string;
    publishTime: string;
    source: string;
    viewCount: number;
    originUrl: string;
}

export async function parseArticle(newsUrl: String): Promise<ArticleData | null> {
    try {
        const html = await fetchHTML(newsUrl.toString());
        console.log('Fetched HTML length:', html.length);
        const doc = parseHTML(html);
        const title = doc.querySelector('h1')?.textContent?.trim() || 'No Title';
        return {
            title: title,
            publishTime: "",
            source: 'Unknown',
            viewCount: 0,
            articleContent: "",
            originUrl: newsUrl.toString()
        };
    } catch (error) {
        console.error('Error parsing article:', error);
    }
    return null;
}

function parseHTML(html: string) {
    const dom = new JSDOM(html);
    return dom.window.document;
}

async function fetchHTML(url: string): Promise<string> {
    const response = await fetch(url);
    return response.text();
}