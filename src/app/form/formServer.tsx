'use server';

export async function updater(formData: FormData) {
  console.log(formData);
}

export async function updaterNew(userId: number, formData: FormData) {
  console.log(userId, formData);
}
