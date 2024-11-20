import { fetchEmailsByEmailUrl } from '@/lib/data';
import { formatDateToLocal } from '@/lib/utils';
import { EmailTransaction } from '@/lib/definitions';

export default async function AutoRegisterTable({
  queryEmail,
}: {
  queryEmail?: string;
}) {
  const emails = queryEmail ? await fetchEmailsByEmailUrl(queryEmail) : [];

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
                  Registration Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {emails?.map((email: EmailTransaction) => (
                <tr
                  key={email.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {email.email_url}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <AccountTypeBadge type={email.type} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(email.created_at)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <StatusBadge status={email.status} />
                  </td>
                </tr>
              ))}
              {emails.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500">
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
