/*
 * @Author: shanlonglong danlonglong@weimiao.cn
 * @Date: 2024-11-20 15:46:58
 * @LastEditors: shanlonglong danlonglong@weimiao.cn
 * @LastEditTime: 2024-11-22 16:28:27
 * @FilePath: \react-next-p\src\app\ui\transactions\invite-form.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client';

import { useState } from 'react';
import { Button } from '@/app/ui/invoices/button';
import { useRouter, useSearchParams } from 'next/navigation';

export default function InviteForm() {
  const [emailUrl, setEmailUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleQuery = async () => {
    try {
      // Update URL with email parameter to trigger table refresh
      const params = new URLSearchParams(searchParams);
      params.set('email', emailUrl);
      router.push(`${window.location.pathname}?${params.toString()}`);
    } catch (error) {
      console.error('Query error:', error);
      setError('Failed to perform query');
    }
  };

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Query Main Email</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Main Email URL
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                value={emailUrl}
                onChange={(e) => setEmailUrl(e.target.value)}
                placeholder="Enter main email URL"
                className="flex-1 rounded-md border border-gray-200 py-2 px-3"
              />
              <Button
                type="button"
                onClick={handleQuery}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Query
              </Button>
            </div>
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
