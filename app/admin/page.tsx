import Form from './form'
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

async function Page() {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }
  return (
    <div>
      <Form />
    </div>
  )
}

export default Page