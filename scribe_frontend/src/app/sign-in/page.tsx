"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black transition-colors">
      {/* ScribeAI Nav */}
      <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-4 flex items-center">
        <span className="text-2xl font-bold text-gray-900 dark:text-white select-none">
          ScribeAI
        </span>
      </nav>
      <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-gray-900 dark:text-white">
        <h1 className="text-2xl font-bold mb-2">Sign In</h1>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-md bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 px-3 py-2 text-gray-900 dark:text-white"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-md bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 px-3 py-2 text-gray-900 dark:text-white"
          />
          <button
            type="submit"
            className="w-full bg-black dark:bg-white text-white dark:text-black font-medium rounded-md px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition"
          >
            Sign In
          </button>
        </form>

        {/* Navigation to signup */}
        <div className="mt-4 text-sm text-gray-800 dark:text-gray-200">
          Not an existing user?{" "}
          <button
            type="button"
            className="underline text-blue-700 dark:text-blue-400 font-semibold"
            onClick={() => router.push("/sign-up")}
          >
            Sign up here
          </button>
        </div>
      </main>
    </div>
  );
}
