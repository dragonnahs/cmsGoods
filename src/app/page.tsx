import ProgressLink from './components/ProgressLink';

export default function Home() {
  return (
    <div className="flex flex-col align-center justify-center">
      111
      <ProgressLink href="/login">start</ProgressLink>
      <ProgressLink href="/serverRender">start slow</ProgressLink>
    </div>
  );
}
