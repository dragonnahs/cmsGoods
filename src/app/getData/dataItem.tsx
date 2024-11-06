'use client';
import { create } from './create';

export default function DataItem() {
  const handleClick = () => {
    create();
  };
  return (
    <div>
      dataItem<button onClick={handleClick}>点击获取数据</button>
    </div>
  );
}
