const getData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('hello world');
    }, 3000);
  });
};

export default async function ServerRender({ hello }: { hello: string }) {
  await getData();
  return <div>server render{hello}</div>;
}
