/*
 * @Author: shanlonglong danlonglong@weimiao.cn
 * @Date: 2024-11-20 15:46:42
 * @LastEditors: shanlonglong danlonglong@weimiao.cn
 * @LastEditTime: 2024-11-20 15:47:13
 * @FilePath: \react-next-p\src\app\transactions\invite\page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Suspense } from 'react';
import { EmailsTableSkeleton } from '@/app/ui/skeletons';
import InviteForm from '@/app/ui/transactions/invite-form';
import EmailsTable from '@/app/ui/transactions/emails-table';

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between mt-6">
        <h1 className="text-2xl">Invite Management</h1>
      </div>

      <div className="mt-4">
        <InviteForm />
      </div>

      <Suspense fallback={<EmailsTableSkeleton />}>
        <EmailsTable emailTransactions={[]} />
      </Suspense>
    </div>
  );
}
