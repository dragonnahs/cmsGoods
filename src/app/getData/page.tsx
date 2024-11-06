'use client';
import DataItem from './dataItem';

async function getData() {
  await fetch('http://www.baidu.com');
}

export default function Page() {
  getData();
  return (
    <div>
      getData
      <DataItem />
    </div>
  );
}
