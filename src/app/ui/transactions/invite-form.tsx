/*
 * @Author: shanlonglong danlonglong@weimiao.cn
 * @Date: 2024-11-20 15:46:58
 * @LastEditors: shanlonglong danlonglong@weimiao.cn
 * @LastEditTime: 2024-11-26 14:31:58
 * @FilePath: \react-next-p\src\app\ui\transactions\invite-form.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client';

import { useState } from 'react';
import { Button } from '@/app/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { updateEmailToken } from '@/lib/actions';
import { useToast } from '../toast';

export default function InviteForm() {
  const { showToast } = useToast();
  const [emailUrl, setEmailUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [emailToken, setEmailToken] = useState<string>('');
  const [tokenEmailUrl, setTokenEmailUrl] =
    useState<string>('baozi1020@2925.com');

  const handleSetToken = async () => {
    await updateEmailToken(tokenEmailUrl, emailToken);
    setEmailToken('');
    showToast('set token success');
  };

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
      <div className="space-y-4 mb-10">
        <div>
          <label className="block text-sm font-medium mb-2">
            Set 2925 Email Token
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              value={tokenEmailUrl}
              onChange={(e) => setTokenEmailUrl(e.target.value)}
              placeholder="enter token email url"
              className="rounded-md border border-gray-200 py-2 px-3"
            />
            <input
              type="text"
              value={emailToken}
              onChange={(e) => setEmailToken(e.target.value)}
              placeholder="Enter 2925 Email Token"
              className="flex-1 rounded-md border border-gray-200 py-2 px-3"
            />
            <Button
              type="button"
              onClick={handleSetToken}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Set
            </Button>
          </div>
          {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
      </div>
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
