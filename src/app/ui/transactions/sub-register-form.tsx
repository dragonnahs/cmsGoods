'use client';

import { useState } from 'react';
import { Button } from '@/app/ui/invoices/button';
import { registerSubEmails } from '@/lib/actions';
import { MainEmailInfo } from '@/lib/definitions';
import { useRouter } from 'next/navigation';

export default function SubRegisterForm({
  mainEmail,
}: {
  mainEmail: MainEmailInfo | null;
}) {
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();

  if (!mainEmail) {
    router.push('/transactions/auto-register/main');
    return null;
  }

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Main Email Information</h3>
        <div className="p-4 bg-blue-50 rounded-md">
          <p className="text-blue-800">Email: {mainEmail.email}</p>
          <p className="text-blue-800">ID: {mainEmail.id}</p>
          <p className="text-blue-800">
            Created: {new Date(mainEmail.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Register Sub Emails</h2>
        <form
          action={async (formData: FormData) => {
            formData.append('main_id', mainEmail.id);
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
    </div>
  );
}
