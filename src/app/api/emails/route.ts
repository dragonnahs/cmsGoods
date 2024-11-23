import { NextResponse } from 'next/server';

const BASE_URL = 'https://2925.com/mailv2/maildata/MailList/mails';
const AUTH_TOKEN = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEMUZFNTBGNTM0MUFCMzkzRkM4RUQ3QUZBODc4ODIxNkY3MzA5MTQiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJyUl9sRDFOQnF6a195TzE2LW9lSUlXOXpDUlEifQ.eyJuYmYiOjE3MzIzMjg1NjksImV4cCI6MTczMjMzMjE2OSwiaXNzIjoiaHR0cHM6Ly9tYWlsbG9naW4uMjk4MC5jb20vb2F1dGgiLCJhdWQiOiIyOTgwX2NsaWVudEB3ZWIiLCJjbGllbnRfaWQiOiJCOTI1N0Y3RjlCMUVGMTVDRSIsInN1YiI6IjIzY2Y4ZjEyLTc0NTktMzc4NC04YWIxLTBhNDRlZDg3YjQ5MSIsImF1dGhfdGltZSI6MTczMjMyNDE1NiwiaWRwIjoibG9jYWwiLCJuYW1lIjoiYmFvemkxMDIwQDI5MjUuY29tIiwibmlja25hbWUiOiJiYW96aTEwMjAiLCJpZCI6IjIzY2Y4ZjEyLTc0NTktMzc4NC04YWIxLTBhNDRlZDg3YjQ5MSIsImRldmljZUlkIjoiZGV2aWNlSWQiLCJyZXFJZCI6Ijg0ODlmOWVhLTliMjMtNDY4MC04Mzk3LTU0Njk0YTgwNDU0NCIsImFubyI6IjAiLCJ0b2tlbkZsYWciOiIwIiwiZmxhZyI6IjAiLCJzY29wZSI6WyJwcm9maWxlIiwib3BlbmlkIiwiMjk4MF9jbGllbnRAd2ViIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.hW7Rv5Rl7FmMhqUjuYUvLpEJZwk8QSgHVeGW3nXeUWYpuv_PfsIP4dqIrr39ona0TXUYBqpgJhj88ZWXnK-IPJScJtZScWwju2hD3ubA6MIoK3ZtScoo53AVYdSM1ax3flrWB8lBgDN8J-rbWWfdowryNDvqyGDBr9azmIRExGga4n1lso1ZREFADUnexrs_2UfuqK2oXb9zAZWDq-VjDoVMmG5IgmSL3WaGFYYRtZ1ymxXuik3bVrPlXZFKmQqBRYVqv9-MC0JkDwIBWck-npTLuo3hX8cyje2qgYXTQ_q4nw-cenaqrunUrXlMWae3DUNRtclUrxiXkhwdoo9SCw';

export async function GET() {
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
        'Authorization': AUTH_TOKEN,
        'Content-Type': 'application/json',
      },
    });

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