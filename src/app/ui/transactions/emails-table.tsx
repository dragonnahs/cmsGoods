'use client';

import { formatDateToLocal } from '@/lib/utils';
import { EmailTransaction } from '@/lib/definitions';
import { useState } from 'react';
import { Button } from '@/app/ui/invoices/button';
import { updateEmailStatus } from '@/lib/actions';
import { useToast } from '@/app/ui/toast';
import { fetchApi } from '@/lib/api/request';

export default function EmailsTable({
  emailTransactions,
}: {
  emailTransactions: EmailTransaction[];
}) {
  const [verificationStates, setVerificationStates] = useState<
    Record<
      string,
      {
        code: string;
        loading: boolean;
        error?: string;
        success?: boolean;
      }
    >
  >({});
  const { showToast } = useToast();

  const handleSendCode = async (email: EmailTransaction) => {
    setVerificationStates((prev) => ({
      ...prev,
      [email.id]: { ...prev[email.id], loading: true, error: undefined },
    }));

    try {
      const data = await fetchApi('/api/trancy/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.email_url,
          referrer: email.referrer,
        }),
      });

      if (data.error) {
        throw new Error(data.error);
      }

      setVerificationStates((prev) => ({
        ...prev,
        [email.id]: { ...prev[email.id], loading: false, success: true },
      }));
      showToast('Verification code sent successfully');
    } catch (error) {
      console.error(error);
      setVerificationStates((prev) => ({
        ...prev,
        [email.id]: {
          ...prev[email.id],
          loading: false,
          error: 'Failed to send code',
        },
      }));
      showToast('Failed to send verification code', 'error');
    }
  };

  const handleValidateCode = async (email: EmailTransaction) => {
    const state = verificationStates[email.id];
    if (!state?.code) return;

    setVerificationStates((prev) => ({
      ...prev,
      [email.id]: { ...prev[email.id], loading: true, error: undefined },
    }));

    try {
      const data = await fetchApi('/api/trancy/validate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.email_url,
          code: state.code,
          referrer: email.referrer,
        }),
      });

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.message === 'ok') {
        await updateEmailStatus(email.id, 'paid');

        setVerificationStates((prev) => ({
          ...prev,
          [email.id]: { ...prev[email.id], loading: false, success: true },
        }));

        showToast('Code validated successfully');
        window.location.reload();
      } else {
        throw new Error('Validation failed');
      }
    } catch (error) {
      console.error(error);
      setVerificationStates((prev) => ({
        ...prev,
        [email.id]: {
          ...prev[email.id],
          loading: false,
          error: 'Failed to validate code',
        },
      }));
      showToast('Failed to validate code', 'error');
    }
  };

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="min-w-full text-gray-900">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Type
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Referrer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Verification
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Validate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {emailTransactions?.map((email) => {
                const state = verificationStates[email.id] || {
                  code: '',
                  loading: false,
                };
                return (
                  <tr
                    key={email.id}
                    className="border-b last-of-type:border-none hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      {email.email_url}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <AccountTypeBadge type={email.type} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <StatusBadge status={email.status} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDateToLocal(email.created_at)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {email.referrer || '-'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <Button
                        onClick={() => handleSendCode(email)}
                        disabled={state.loading}
                        className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
                      >
                        {state.loading ? 'Sending...' : 'Send Code'}
                      </Button>
                      {state.error && (
                        <p className="text-red-500 text-xs mt-1">
                          {state.error}
                        </p>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={state.code || ''}
                          onChange={(e) =>
                            setVerificationStates((prev) => ({
                              ...prev,
                              [email.id]: {
                                ...prev[email.id],
                                code: e.target.value,
                              },
                            }))
                          }
                          className="w-24 rounded border px-2 py-1"
                          placeholder="Enter code"
                        />
                        <Button
                          onClick={() => handleValidateCode(email)}
                          disabled={state.loading || !state.code}
                          className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600"
                        >
                          {state.loading ? 'Validating...' : 'Validate'}
                        </Button>
                      </div>
                      {state.error && (
                        <p className="text-red-500 text-xs mt-1">
                          {state.error}
                        </p>
                      )}
                    </td>
                  </tr>
                );
              })}
              {emailTransactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-500">
                    No emails found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AccountTypeBadge({ type }: { type: number }) {
  const typeStyles = {
    1: 'bg-blue-500/10 text-blue-700',
    0: 'bg-gray-500/10 text-gray-700',
  };

  const typeText = {
    1: 'Main Account',
    0: 'Sub Account',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
        typeStyles[type as keyof typeof typeStyles]
      }`}
    >
      {typeText[type as keyof typeof typeText]}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusStyles = {
    sent: 'bg-green-500/10 text-green-700',
    failed: 'bg-red-500/10 text-red-700',
    pending: 'bg-yellow-500/10 text-yellow-700',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
        statusStyles[status as keyof typeof statusStyles]
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
