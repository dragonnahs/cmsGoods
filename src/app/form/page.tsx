'use client';
import { useRef } from 'react';
import { updater, updaterNew } from './formServer';
export default function Form() {
  const formRef = useRef(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    updater(formData);
  };
  const handleUpdateNew = updaterNew.bind(null, 123);
  return (
    <div>
      form
      <form ref={formRef} onSubmit={handleSubmit}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button type="submit">Update User Name</button>
      </form>
      <form action={handleUpdateNew}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button type="submit">Update User Name</button>
      </form>
    </div>
  );
}
