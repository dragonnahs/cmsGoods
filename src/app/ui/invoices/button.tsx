/*
 * @Author: shanlonglong danlonglong@weimiao.cn
 * @Date: 2024-11-15 16:35:47
 * @LastEditors: shanlonglong danlonglong@weimiao.cn
 * @LastEditTime: 2024-11-19 10:21:08
 * @FilePath: \react-next-p\src\app\ui\invoices\button.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client';

import Link from 'next/link';

export default function CreateInvoice() {
  return <Link href="/dashboard/invoices/create">Create Invoice</Link>;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...rest }: ButtonProps) {
  return <button {...rest}>{children}</button>;
}
