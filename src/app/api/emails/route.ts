/*
 * @Author: shanlonglong danlonglong@weimiao.cn
 * @Date: 2024-11-25 10:54:06
 * @LastEditors: shanlonglong danlonglong@weimiao.cn
 * @LastEditTime: 2024-11-26 15:01:49
 * @FilePath: \react-next-p\src\app\api\emails\route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NextResponse } from 'next/server';

const BASE_URL = 'https://2925.com/mailv2/maildata/MailList/mails';
// const AUTH_TOKEN = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEMUZFNTBGNTM0MUFCMzkzRkM4RUQ3QUZBODc4ODIxNkY3MzA5MTQiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJyUl9sRDFOQnF6a195TzE2LW9lSUlXOXpDUlEifQ.eyJuYmYiOjE3MzIzNTQ4NTUsImV4cCI6MTczMjM1ODQ1NSwiaXNzIjoiaHR0cHM6Ly9tYWlsbG9naW4uMjk4MC5jb20vb2F1dGgiLCJhdWQiOiIyOTgwX2NsaWVudEB3ZWIiLCJjbGllbnRfaWQiOiJCOTI1N0Y3RjlCMUVGMTVDRSIsInN1YiI6IjIzY2Y4ZjEyLTc0NTktMzc4NC04YWIxLTBhNDRlZDg3YjQ5MSIsImF1dGhfdGltZSI6MTczMjMyNDE1NiwiaWRwIjoibG9jYWwiLCJuYW1lIjoiYmFvemkxMDIwQDI5MjUuY29tIiwibmlja25hbWUiOiJiYW96aTEwMjAiLCJpZCI6IjIzY2Y4ZjEyLTc0NTktMzc4NC04YWIxLTBhNDRlZDg3YjQ5MSIsImRldmljZUlkIjoiZGV2aWNlSWQiLCJyZXFJZCI6Ijg0ODlmOWVhLTliMjMtNDY4MC04Mzk3LTU0Njk0YTgwNDU0NCIsImFubyI6IjAiLCJ0b2tlbkZsYWciOiIwIiwiZmxhZyI6IjAiLCJzY29wZSI6WyJwcm9maWxlIiwib3BlbmlkIiwiMjk4MF9jbGllbnRAd2ViIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.GAv6MJKhgU-KJaF3VEkDtHEU7_J0OcTIKU872nub3KpcB9yRP5GLA_16Sz5xXAcXoO6x4JL5FXW0QjGeBaLc0Qv9_Ceq45m3RadMw9L4hgirq6o9IoGLLqX363S-pvNY7L4xkBpU-UR55EYXOIb8m3zl8f0vnQ69ObPMyyXUJbB3G66lHFkjH6dwM7lsdHFcFjjZsFYyMnXLBGVNW_2WBEpEl4cPV99b4YamXscMj93qBa2juCMAyvx94SEdOiUuhd940rzkqiJtFXwheqSRPGNKSaQdOd5QFNhMciVdAkiopKs4Fqjjl_ZR4O62AYdho0W_Pn0enbaqH6iMxaQ8TQ';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  try {
    const queryParams = new URLSearchParams({
      Folder: 'Inbox',
      MailBox: 'baozi1020@2925.com',
      FilterType: '0',
      PageIndex: '1',
      PageCount: '40',
      traceId: '7e0446bf9ef0'
    });

    const response = await fetch(`${BASE_URL}?${queryParams.toString()}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 401) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await response.json();
    if (data.code !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emails' },
      { status: 500 }
    );
  }
} 