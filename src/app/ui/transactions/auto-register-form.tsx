/*
 * @Author: shanlonglong danlonglong@weimiao.cn
 * @Date: 2024-11-20 09:02:43
 * @LastEditors: shanlonglong danlonglong@weimiao.cn
 * @LastEditTime: 2024-11-20 12:15:45
 * @FilePath: \react-next-p\src\app\ui\transactions\auto-register-form.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/app/ui/invoices/button';
import { registerMainEmail, registerSubEmails } from '@/lib/actions';
import { MainEmailInfo } from '@/lib/definitions';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function AutoRegisterForm({
  mainEmail,
}: {
  mainEmail: MainEmailInfo | null;
}) {
  const [showSubForm, setShowSubForm] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [mainId, setMainId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [mainEmailInfo, setMainEmailInfo] = useState<MainEmailInfo | null>(
    mainEmail,
  );

  // Set mainId when mainEmail is available (either from props or after query/registration)
  useEffect(() => {
    if (mainEmail?.id) {
      setMainId(mainEmail.id);
      setMainEmailInfo(mainEmail);
      setShowSubForm(true);
    }
  }, [mainEmail]);

  const handleMainEmailSubmit = async (formData: FormData) => {
    const middlePart = formData.get('email') as string;
    const fullEmail = `baozi1020${middlePart}@2925.com`;

    const newFormData = new FormData();
    newFormData.append('email', fullEmail);

    const result = await registerMainEmail(newFormData);
    if (result?.message) {
      setError(result.message);
      if (result.mainEmail) {
        setMainEmailInfo(result.mainEmail as MainEmailInfo);
        setMainId(result.mainEmail.id);
        setShowSubForm(true);
      }
    } else {
      setShowSubForm(true);
      setError('');
      setMainEmailInfo(result?.mainEmail as MainEmailInfo | null);
      if (result?.mainEmail?.id) {
        setMainId(result.mainEmail.id);
      }
    }
  };

  const handleQueryEmail = async () => {
    const middlePart = (
      document.querySelector('input[name="email"]') as HTMLInputElement
    ).value;
    const fullEmail = `baozi1020${middlePart}@2925.com`;

    try {
      const response = await fetch(`/api/emails/query?email=${fullEmail}`);
      const data = await response.json();

      if (data.email) {
        setMainEmailInfo(data.email);
        setMainId(data.email.id);
        setShowSubForm(true);
        setError('');
      } else {
        setError('Email not found');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to query email');
    }
  };

  const handleBackToMain = () => {
    setMainEmailInfo(null);
    setShowSubForm(false);
    setMainId('');
    setError('');
  };

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      {/* Main Email Registration Section */}
      {!mainEmailInfo && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-4">Register Main Email</h2>
          <form action={handleMainEmailSubmit}>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">baozi1020</span>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter middle part"
                  className="flex-1 rounded-md border border-gray-200 py-2 px-3"
                  required
                  pattern="[a-zA-Z0-9]+"
                  title="Only alphanumeric characters are allowed"
                />
                <span className="text-gray-600">@2925.com</span>
                <Button
                  type="button"
                  onClick={handleQueryEmail}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Query Email
                </Button>
              </div>
              {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}
              <Button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Register Main
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Main Email Info Display */}
      {mainEmailInfo && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Main Email Information</h3>
            <Button
              type="button"
              onClick={handleBackToMain}
              className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Main Registration
            </Button>
          </div>
          <div className="p-4 bg-blue-50 rounded-md">
            <p className="text-blue-800">Email: {mainEmailInfo.email}</p>
            <p className="text-blue-800">ID: {mainEmailInfo.id}</p>
            <p className="text-blue-800">
              Created: {new Date(mainEmailInfo.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {/* Sub Emails Registration Section */}
      {(mainEmailInfo || showSubForm) && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Register Sub Emails</h2>
          <form
            action={async (formData: FormData) => {
              await registerSubEmails(formData);
            }}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Main Email ID
                </label>
                <input
                  type="text"
                  name="main_id"
                  value={mainId}
                  readOnly
                  className="w-full rounded-md border border-gray-200 py-2 px-3 bg-gray-100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Number of Sub Accounts
                </label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="rounded-md border border-gray-200 py-2 px-3"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Generate Sub Accounts
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
