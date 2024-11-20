'use client';

import { useState } from 'react';
import { Button } from '@/app/ui/invoices/button';
import { MainEmailInfo } from '@/lib/definitions';

interface LoginResponse {
  message: string;
  data?: {
    token: string;
  };
}

interface ProfileResponse {
  message: string;
  data?: {
    id: string;
  };
}

export default function InviteForm() {
  const [emailUrl, setEmailUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [mainEmailInfo, setMainEmailInfo] = useState<MainEmailInfo | null>(
    null,
  );
  const [token, setToken] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const handleQuery = async () => {
    try {
      // First query email info
      const emailResponse = await fetch(`/api/emails/query?email=${emailUrl}`);
      const emailData = await emailResponse.json();

      if (!emailData.email) {
        setError('Email not found');
        setMainEmailInfo(null);
        return;
      }

      // Then try to login with Trancy
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

      const loginData: LoginResponse = await loginResponse.json();

      if (loginData.message === 'ok' && loginData.data?.token) {
        setMainEmailInfo(emailData.email);
        setToken(loginData.data.token);
        setError('');

        // After successful login, fetch profile
        const profileResponse = await fetch(
          'https://api.trancy.org/1/user/profile',
          {
            headers: {
              Cookie: `trancy=${loginData.data.token}`,
            },
          },
        );

        const profileData: ProfileResponse = await profileResponse.json();

        if (profileData.message === 'ok' && profileData.data?.id) {
          setUserId(profileData.data.id);
        }

        // Update URL with email parameter
        const params = new URLSearchParams(window.location.search);
        params.set('email', emailUrl);
        window.history.replaceState(
          {},
          '',
          `${window.location.pathname}?${params.toString()}`,
        );
      } else {
        setError('Failed to authenticate with Trancy');
        setMainEmailInfo(null);
      }
    } catch (error) {
      console.error('Query error:', error);
      setError('Failed to perform query');
      setMainEmailInfo(null);
    }
  };

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      {/* Email Query Section */}
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

      {/* Main Email Info Display */}
      {mainEmailInfo && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Main Email Information</h3>
          <div className="p-4 bg-blue-50 rounded-md space-y-2">
            <p className="text-blue-800">Email: {mainEmailInfo.email}</p>
            <p className="text-blue-800">ID: {mainEmailInfo.id}</p>
            <p className="text-blue-800">
              Created: {new Date(mainEmailInfo.created_at).toLocaleDateString()}
            </p>
            <p className="text-blue-800 mt-2">
              Token: {token.substring(0, 20)}...
            </p>
            {userId && (
              <p className="text-blue-800 font-semibold">User ID: {userId}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
