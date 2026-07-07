"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { FormEvent } from "react";
import { toast } from "sonner"

export default function SignIn() {
  async function credentialsAction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log(result);

    if (result?.error) {
      toast.error("Invalid email or password.");
    } else {
      toast.success("Signed in successfully.");
       window.location.href = "/";
    }

   
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
      <form
        onSubmit={credentialsAction}
        className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg"
      >
        <h1 className="mb-6 text-center text-3xl font-bold">Sign In</h1>

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
            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-black py-2 font-medium text-white transition hover:bg-zinc-800"
        >
          Sign In
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Dont have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}