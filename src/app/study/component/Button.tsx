import clsx from 'clsx';

export default function Button({ status }: { status?: string }) {
  return (
    <button
      className={clsx('bg-blue-500 w-32 h-10 rounded text-white', {
        'bg-red-500': status === 'error',
      })}
    >
      Button
    </button>
  );
}
