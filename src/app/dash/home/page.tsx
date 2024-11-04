import { redirect } from 'next/navigation';

async function fetchData() {
  function myPromise() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('hello world');
      }, 3000);
    });
  }
  await myPromise();
  return {
    id: 1,
  };
}

export default async function Home() {
  const { id } = await fetchData();
  if (id === 1) {
    redirect('/login');
  }
  return <div>home</div>;
}
