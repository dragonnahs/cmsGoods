'use client';

import { useState } from 'react';
import { Button } from '@/app/ui/invoices/button';
import { registerMainEmail, registerSubEmails } from '@/lib/actions';
import { MainEmailInfo } from '@/lib/definitions';

export default function AutoRegisterForm({
  mainEmail,
}: {
  mainEmail: MainEmailInfo | null;
}) {
  const [showSubForm, setShowSubForm] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [mainId, setMainId] = useState<string>('');

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      {/* Main Email Registration Section */}
      {!mainEmail && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-4">Register Main Email</h2>
          <form
            action={async (formData: FormData) => {
              await registerMainEmail(formData);
              setShowSubForm(true);
            }}
          >
            <div className="flex gap-4">
              <input
                type="email"
                name="email"
                placeholder="Enter main email"
                className="flex-1 rounded-md border border-gray-200 py-2 px-3"
                required
              />
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

      {/* Sub Emails Registration Section */}
      {(mainEmail || showSubForm) && (
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
                  onChange={(e) => setMainId(e.target.value)}
                  placeholder="Enter main email ID"
                  className="w-full rounded-md border border-gray-200 py-2 px-3"
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
