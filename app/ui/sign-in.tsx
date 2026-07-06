import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", formData);
        }}
        className="w-full max-w-sm rounded-lg bg-white p-8 shadow-lg"
      >
        <h1 className="mb-6 text-center text-3xl font-bold">Sign In</h1>

        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-black"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-black"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-black py-2 font-medium text-white transition hover:bg-zinc-800"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}