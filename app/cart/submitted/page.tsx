import Navbar from '@/app/ui/navbar'

function Page() {
  return (
    <div>
        <Navbar />
        <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Order Submitted</h1>
      <p className="text-lg">Thank you for your order! Your order has been successfully submitted.</p>
    </main>
    </div>
  )
}

export default Page