import { db } from "@/db/client";
import { usersTable } from "@/drizzle/schema";
import { saltAndHashPassword } from "@/utils/password";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function SignUp() {

async function handleSubmit(formData: FormData) {
    "use server";

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const hash = await saltAndHashPassword(password as string);

    try {
        await db.insert(usersTable).values({
            name: name as string,
            password: hash,
            email: email as string,
        });
        toast.success("Account created successfully. Please sign in.");
        window.location.href = "/sign-in";
    } catch (error) {
        console.error(error);
    }
}


  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
      <form action={handleSubmit} className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Create Account
        </h1>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>
        <div className="mb-6">
        <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-gray-700"
        >
            Confirm Password
        </label>

        <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
        />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-black py-2 font-medium text-white transition hover:bg-zinc-800"
        >
          Create Account
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}