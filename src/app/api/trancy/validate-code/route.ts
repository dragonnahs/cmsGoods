/*
 * @Author: shanlonglong danlonglong@weimiao.cn
 * @Date: 2024-11-22 16:41:45
 * @LastEditors: shanlonglong danlonglong@weimiao.cn
 * @LastEditTime: 2024-11-22 18:16:35
 * @FilePath: \react-next-p\src\app\api\trancy\validate-code\route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, code, referrer } = await request.json();

  try {
    // First login to get token
    const loginResponse = await fetch('https://api.trancy.org/1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password: '123456',
      }),
    });

    const loginData = await loginResponse.json();
    if (loginData.message !== 'ok' || !loginData.data?.token) {
      return NextResponse.json({ error: 'Login failed' }, { status: 400 });
    }

    // Then validate codehttps://api.trancy.org/1/user/emailStatus
    const validateResponse = await fetch('https://api.trancy.org/1/user/emailStatus', {
      method: 'PATCH',
      headers: {
        'Cookie': `referrer=${referrer}; trancy=${loginData.data.token}`,
        'Authorization': `Bearer ${loginData.data.token}`,
      },
      body: JSON.stringify({ code }),
    });

    const validateData = await validateResponse.json();
    console.log(validateData);
    return NextResponse.json(validateData);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to validate code' },
      { status: 500 }
    );
  }
} 