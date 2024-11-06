'use server';
export async function create() {
  const res = await fetch('http://www.baidu.com');
  console.log(res);
  return res.json();
}
