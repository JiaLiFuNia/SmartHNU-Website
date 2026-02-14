import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * PDF 代理接口 - 用于解决跨域在线 PDF 的 CORS 问题
 * 使用方式: /api/pdf-proxy?url=https://example.com/file.pdf
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 只允许 GET 请求
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.query;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing 'url' query parameter" });
  }

  // 验证 URL 格式
  let pdfUrl: URL;
  try {
    pdfUrl = new URL(url);
  } catch {
    return res.status(400).json({ error: "Invalid URL" });
  }

  // 仅允许 http/https 协议
  if (!["http:", "https:"].includes(pdfUrl.protocol)) {
    return res.status(400).json({ error: "Only http/https URLs are supported" });
  }

  try {
    const response = await fetch(pdfUrl.href, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/pdf,*/*",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `Failed to fetch PDF: ${response.statusText}` });
    }

    const contentType =
      response.headers.get("content-type") || "application/pdf";
    const contentLength = response.headers.get("content-length");

    // 设置响应头
    res.setHeader("Content-Type", contentType);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Range");
    res.setHeader("Access-Control-Expose-Headers", "Content-Length, Content-Range, Accept-Ranges");
    res.setHeader("Cache-Control", "public, max-age=86400"); // 缓存 1 天

    if (contentLength) {
      res.setHeader("Content-Length", contentLength);
    }

    // 支持 Range 请求（PDF.js 可能使用分段加载）
    const acceptRanges = response.headers.get("accept-ranges");
    if (acceptRanges) {
      res.setHeader("Accept-Ranges", acceptRanges);
    }

    const contentRange = response.headers.get("content-range");
    if (contentRange) {
      res.setHeader("Content-Range", contentRange);
    }

    // 将远程 PDF 内容转发给客户端
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return res.status(response.status).send(buffer);
  } catch (err: any) {
    console.error("PDF proxy error:", err);
    return res
      .status(500)
      .json({ error: "Failed to fetch PDF", details: err.message });
  }
}
