import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// 加载 .env.local 文件
config({ path: '.env.local' });

// 初始化 Supabase 客户端
const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
);

// 课表数据类型
type CourseTable = {
    courseData: string;
    createdAt?: number;
};

type ResponseData = {
    code: number;
    message: string;
    data?: any;
};

// 存储抽象层
const storage = {
    async set(shareCode: string, courseData: string, expiresIn: number): Promise<void> {
        const expiresAt = new Date(Date.now() + expiresIn * 1000);
        await supabase.from('course_shares').upsert({
            share_code: shareCode,
            course_data: courseData,
            created_at: new Date().toISOString(),
            expires_at: expiresAt.toISOString()
        });
    },
    async get(shareCode: string): Promise<string | null> {
        const { data, error } = await supabase
            .from('course_shares')
            .select('course_data, expires_at')
            .eq('share_code', shareCode)
            .single();

        if (error || !data) return null;

        // 检查是否过期
        if (new Date(data.expires_at) < new Date()) {
            await supabase.from('course_shares').delete().eq('share_code', shareCode);
            return null;
        }

        return data.course_data;
    },
    async exists(shareCode: string): Promise<boolean> {
        const { data } = await supabase
            .from('course_shares')
            .select('share_code')
            .eq('share_code', shareCode)
            .single();
        return !!data;
    }
};

// 生成6位随机共享码
function generateShareCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// 生成唯一共享码
async function generateUniqueCode(): Promise<string> {
    let code = generateShareCode();
    let attempts = 0;
    while (await storage.exists(code) && attempts < 10) {
        code = generateShareCode();
        attempts++;
    }
    return code;
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    // 设置CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // POST: 保存课表，生成共享码
        if (req.method === 'POST') {
            const { courseData } = req.body as { courseData: string };

            if (!courseData || typeof courseData !== 'string' || courseData.trim() === '') {
                return res.status(200).json({
                    code: 400,
                    message: '课表数据不能为空'
                });
            }

            const shareCode = await generateUniqueCode();
            const courseTable: CourseTable = {
                courseData,
                createdAt: Date.now()
            };

            // 保存到存储，设置30分钟过期
            await storage.set(shareCode, JSON.stringify(courseTable), 30 * 60);

            return res.status(200).json({
                code: 200,
                message: '课表分享成功',
                data: {
                    shareCode,
                    expiresIn: 30 * 60
                }
            });
        }

        // GET: 通过共享码获取课表
        if (req.method === 'GET') {
            const { code } = req.query;

            if (!code || typeof code !== 'string') {
                return res.status(200).json({
                    code: 400,
                    message: '共享码不能为空'
                });
            }

            const data = await storage.get(code.toUpperCase());

            if (!data) {
                return res.status(200).json({
                    code: 404,
                    message: '共享码不存在或已过期'
                });
            }

            const courseTable: CourseTable = JSON.parse(data);

            return res.status(200).json({
                code: 200,
                message: '获取成功',
                data: courseTable.courseData
            });
        }

        return res.status(200).json({
            code: 405,
            message: '不支持的请求方法'
        });

    } catch (error) {
        console.error('Course API Error:', error);
        return res.status(200).json({
            code: 500,
            message: '服务器错误'
        });
    }
}