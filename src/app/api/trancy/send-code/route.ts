/*
 * @Author: shanlonglong danlonglong@weimiao.cn
 * @Date: 2024-11-22 16:41:40
 * @LastEditors: shanlonglong danlonglong@weimiao.cn
 * @LastEditTime: 2024-11-26 16:21:36
 * @FilePath: \react-next-p\src\app\api\trancy\send-code\route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NextResponse } from 'next/server';
import { HttpsProxyAgent } from 'https-proxy-agent';

export async function POST(request: Request) {
  const { email, referrer } = await request.json();

  try {

    const proxyUrl = `http://127.0.0.1:7890`;
    const proxyAgent = new HttpsProxyAgent(proxyUrl);
    // Use node-fetch with proxy agent
    const loginResponse = await fetch('https://api.trancy.org/1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password: 'trancy123456',
      }),
      agent: proxyAgent,
    });
    const loginData = await loginResponse.json() as { message: string; data?: { token: string } };
    if (loginData.message !== 'ok' || !loginData.data?.token) {
      return NextResponse.json({ error: 'Login failed' }, { status: 400 });
    }

    // Then send verification code using the same proxy
    const codeResponse = await fetch('https://api.trancy.org/1/passcodes', {
      method: 'POST',
      headers: {
        'Cookie': `referrer=${referrer}; trancy=${loginData.data.token}`,
      },
      body: JSON.stringify({
        email,
        scene: 'SET-EMAIL',
      }),
      agent: proxyAgent,
    });

    const codeData = await codeResponse.json();
    return NextResponse.json(codeData);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to send verification code' },
      { status: 500 }
    );
  }
} 