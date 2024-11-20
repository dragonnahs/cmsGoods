/*
 * @Author: shanlonglong danlonglong@weimiao.cn
 * @Date: 2024-11-19 10:06:53
 * @LastEditors: shanlonglong danlonglong@weimiao.cn
 * @LastEditTime: 2024-11-20 10:04:26
 * @FilePath: \react-next-p\src\lib\actions
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Create a schema for invoice validation
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

// This is temporary until @types/react-dom is updated
type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function updateInvoice(formData: FormData): Promise<State> {
 
  // Validate form fields using Zod
  const validatedFields = FormSchema.safeParse({
    id: formData.get('id'),
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
    date: new Date().toISOString(),
  });

  // If form validation fails, return errors early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  // Prepare data for update
  const { customerId, amount, status, id } = validatedFields.data;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId},
          amount = ${amount},
          status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// You might also want to add the createInvoice function if not already present
export async function createInvoice(prevState: unknown, formData: FormData): Promise<State> {
  const validatedFields = FormSchema.omit({ id: true }).safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
    date: new Date().toISOString(),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { customerId, amount, status, date } = validatedFields.data;

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amount}, ${status}, ${date})
    `;
  } catch (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function createEmailTransaction(formData: FormData) {
  const { email_url, status, type } = {
    email_url: formData.get('email_url'),
    status: formData.get('status'),
    type: Number(formData.get('type')),
  };

  try {
    await sql`
      INSERT INTO email_transactions (email_url, status, date, type)
      VALUES (${String(email_url)}, ${String(status)}, ${new Date().toISOString()}, ${type})
    `;
    revalidatePath('/transactions/emails');
    redirect('/transactions/emails');
  } catch (error) {
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Email Transaction.',
    };
  }
}

export async function updateEmailTransaction(id: string, formData: FormData) {
  const { email_url, status, type } = {
    email_url: formData.get('email_url'),
    status: formData.get('status'),
    type: Number(formData.get('type')),
  };

  try {
    await sql`
      UPDATE email_transactions
      SET email_url = ${String(email_url)}, 
          status = ${String(status)},
          type = ${type}
      WHERE id = ${id}
    `;
    revalidatePath('/transactions/emails');
    redirect('/transactions/emails');
  } catch (error) {
    console.log(error)
    return {
      message: 'Database Error: Failed to Update Email Transaction.',
    };
  }
}

export async function deleteEmailTransaction(id: string) {
  try {
    await sql`DELETE FROM email_transactions WHERE id = ${id}`;
    revalidatePath('/transactions/emails');
  } catch (error) {
    console.log(error)
    return {
      message: 'Database Error: Failed to Delete Email Transaction.',
    };
  }
}

export async function registerMainEmail(formData: FormData) {
  const email = formData.get('email');

  try {
    await sql`
      INSERT INTO emails (email_url, status, date, type)
      VALUES (${String(email)}, 'pending', ${new Date().toISOString()}, 1)
    `;
    revalidatePath('/transactions/auto-register');
  } catch (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to register main email.',
    };
  }
}

export async function registerSubEmails(formData: FormData) {
  const quantity = Number(formData.get('quantity'));
  const mainId = formData.get('main_id');

  try {
    // Generate and insert sub emails
    for (let i = 0; i < quantity; i++) {
      const randomString = Math.random().toString(36).substring(7);
      const email = `sub_${randomString}@domain.com`;

      await sql`
        INSERT INTO emails (email_url, status, date, type, main_id)
        VALUES (${email}, 'pending', ${new Date().toISOString()}, 0, ${String(mainId)})
      `;
    }

    revalidatePath('/transactions/auto-register');
  } catch (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to register sub emails.',
    };
  }
}