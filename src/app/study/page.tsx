import Image from 'next/image';
import Button from './component/Button';

export default function Page() {
  return (
    <div>
      <Image
        className="hidden sm:block"
        src="/globe.svg"
        alt="logo"
        width={200}
        height={200}
      />
      <Image
        className="block sm:hidden"
        src={'/file.svg'}
        alt="logo"
        width={200}
        height={200}
      />
      <Button status="error" />
    </div>
  );
}
