'use client';

import { useState } from 'react';
import { Button } from '@/app/ui/invoices/button';
import { registerMainEmail } from '@/lib/actions';
import { MainEmailInfo } from '@/lib/definitions';
import { useRouter } from 'next/navigation';

export default function MainRegisterForm({
  mainEmail,
}: {
  mainEmail: MainEmailInfo | null;
}) {
  console.log(mainEmail);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleMainEmailSubmit = async (formData: FormData) => {
    const middlePart = formData.get('email') as string;
    const fullEmail = middlePart;

    const newFormData = new FormData();
    newFormData.append('email', fullEmail);

    const result = await registerMainEmail(newFormData);
    if (result?.message) {
      setError(result.message);
      if (result.mainEmail) {
        router.push('/transactions/auto-register/sub');
      }
    } else if (result?.mainEmail) {
      router.push('/transactions/auto-register/sub');
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
        router.push('/transactions/auto-register/sub');
      } else {
        setError('Email not found');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to query email');
    }
  };

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-4">Register Main Email</h2>
        <form action={handleMainEmailSubmit}>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {/* <span className="text-gray-600">baozi1020</span> */}
              <input
                type="text"
                name="email"
                placeholder="Enter middle part"
                className="flex-1 rounded-md border border-gray-200 py-2 px-3"
                required
                title="Only alphanumeric characters are allowed"
              />
              {/* <span className="text-gray-600">@2925.com</span> */}
              <Button
                type="button"
                onClick={handleQueryEmail}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Query Email
              </Button>
            </div>
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
            <Button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Register Main
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
