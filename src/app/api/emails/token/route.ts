/*
 * @Author: shanlonglong danlonglong@weimiao.cn
 * @Date: 2024-11-26 14:43:49
 * @LastEditors: shanlonglong danlonglong@weimiao.cn
 * @LastEditTime: 2024-11-26 14:54:43
 * @FilePath: \react-next-p\src\app\api\emails\token\route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await sql`SELECT token FROM email_tokens where email_url = 'baozi1020@2925.com'`;
  return NextResponse.json(token.rows[0]);
}

