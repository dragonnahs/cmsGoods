'use client';

import { useState } from 'react';
import { Button } from '@/app/ui/invoices/button';
import { registerSubEmails } from '@/lib/actions';
import { MainEmailInfo } from '@/lib/definitions';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SubRegisterForm() {
  const [quantity, setQuantity] = useState<number>(1);
  const [emailUrl, setEmailUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [queryResult, setQueryResult] = useState<MainEmailInfo | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleQueryEmail = async () => {
    try {
      // First get email info
      const emailResponse = await fetch(`/api/emails/query?email=${emailUrl}`);
      const emailData = await emailResponse.json();

      if (!emailData.email) {
        setError('Email not found');
        setQueryResult(null);
        return;
      }

      // Then try to login with Trancy to get referrer ID
      const loginResponse = await fetch('https://api.trancy.org/1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailUrl,
          password: '123456',
        }),
      });

      const loginData = await loginResponse.json();
      console.log(loginData);

      if (loginData.message === 'ok' && loginData.data?.token) {
        // Update URL with both email and referrer
        const params = new URLSearchParams(searchParams);
        params.set('email', emailUrl);
        params.set('referrer', loginData.data.id);
        router.push(`${window.location.pathname}?${params.toString()}`);

        setQueryResult(emailData.email);
        setError('');
      } else {
        setError('Failed to authenticate');
        setQueryResult(null);
      }
    } catch (error) {
      console.error(error);
      setError('Failed to query email');
      setQueryResult(null);
    }
  };

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      {/* Email Query Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Query Main Email</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email URL</label>
            <div className="flex gap-4">
              <input
                type="text"
                value={emailUrl}
                onChange={(e) => setEmailUrl(e.target.value)}
                placeholder="Enter email URL"
                className="flex-1 rounded-md border border-gray-200 py-2 px-3"
              />
              <Button
                type="button"
                onClick={handleQueryEmail}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Query
              </Button>
            </div>
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
          </div>
        </div>
      </div>

      {/* Query Result Display */}
      {queryResult && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Main Email Information</h3>
          <div className="p-4 bg-blue-50 rounded-md">
            <p className="text-blue-800">Email: {queryResult.email}</p>
            <p className="text-blue-800">ID: {queryResult.id}</p>
            <p className="text-blue-800">
              Created: {new Date(queryResult.created_at).toLocaleDateString()}
            </p>
            {searchParams.get('referrer') && (
              <p className="text-blue-800 mt-2">
                Referrer ID: {searchParams.get('referrer')}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Sub Emails Registration Section */}
      {queryResult && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Register Sub Emails</h2>
          <form
            action={async (formData: FormData) => {
              formData.append('main_id', queryResult.id);
              await registerSubEmails(formData);
            }}
          >
            <div className="space-y-4">
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
