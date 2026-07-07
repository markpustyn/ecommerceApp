import Form from './form'
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import { redirect } from 'next/navigation';

async function Page() {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }
  return (
    <div>
      <SessionProvider>
        <Form />
      </SessionProvider>
    </div>
  )
}

export default Page