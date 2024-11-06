'use client';
import { useRef } from 'react';
import { updater } from './formServer';
export default function Form() {
  const formRef = useRef(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    updater(formData);
  };
  return (
    <div>
      form
      <form ref={formRef} onSubmit={handleSubmit}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button type="submit">Update User Name</button>
      </form>
    </div>
  );
}
