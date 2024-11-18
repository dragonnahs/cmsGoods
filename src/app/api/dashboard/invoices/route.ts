/*
 * @Author: shanlonglong danlonglong@weimiao.cn
 * @Date: 2024-11-15 18:07:11
 * @LastEditors: shanlonglong danlonglong@weimiao.cn
 * @LastEditTime: 2024-11-15 18:32:18
 * @FilePath: \react-next-p\src\app\api\dashboard\invoices\route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
export async function GET() {
  const data =await sql`SELECT COUNT(*) FROM invoices`;
  return NextResponse.json({
    count: data.rows[0].count ?? '0'
   });
}
