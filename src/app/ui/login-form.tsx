"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  authenticate,
  authenticateWithGoogle,
  signup,
} from "@/app/lib/actions";
import {
  ArrowRightIcon,
  AtSignIcon,
  CircleAlertIcon,
  KeyRoundIcon,
  Loader2Icon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

function SignInGoogle() {
  const [errorMessage, dispatch] = useFormState(
    authenticateWithGoogle,
    undefined
  );

  return (
    <form action={dispatch}>
      <button className="my-5 w-full bg-gray-100 rounded flex py-2 px-4 justify-center hover:bg-gray-200 items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="mr-3"
          alt="Signin with Google"
          height="15"
          width="15"
          src="https://cdn.simpleicons.org/google?viewbox=auto"
        />
        Signin with Google
      </button>
    </form>
  );
}

export function RegisterForm() {
  return (
    <div className="flex-1 rounded-lg bg-gray-50 p-4">
      <form action={signup} className="space-y-3">
        <div>
          <h1 className={`mb-3 text-2xl`}>Please log in to continue.</h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="name"
              >
                Name
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="name"
                  type="text"
                  name="name"
                  min={3}
                  placeholder="Enter your name"
                  required
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
                <AtSignIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
                <KeyRoundIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <LoginButton label="Register" />
        </div>
      </form>

      <div className="flex items-center mt-4">
        <div className="border flex-grow"></div>
        <div className="px-3 text-sm">or</div>
        <div className="border flex-grow"></div>
      </div>
      <SignInGoogle />
      <div className="flex justify-center text-sm mb-4">
        Already member?{" "}
        <Link
          href="/auth/signin"
          className="text-pink-700 ml-2 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <form action={dispatch} className="space-y-3" noValidate>
        <div>
          <h1 className={`mb-3 text-2xl`}>Please log in to continue.</h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
                <AtSignIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
                <KeyRoundIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <LoginButton />
          <div
            className="flex items-end space-x-1 justify-center"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                <CircleAlertIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
        </div>
      </form>

      <div className="flex items-center mt-4">
        <div className="border flex-grow"></div>
        <div className="px-3 text-sm">or</div>
        <div className="border flex-grow"></div>
      </div>
      <SignInGoogle />
      <div className="flex justify-center text-sm mb-4">
        Do not have an account?{" "}
        <Link
          href="/auth/register"
          className="text-pink-700 ml-2 hover:underline"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

function LoginButton({
  label = "Log in",
  isErr = false,
}: {
  label?: string;
  isErr?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className="mt-6 w-full bg-pink-500  text-white flex flex-row px-4 py-2 rounded hover:bg-pink-600 disabled:cursor-not-allowed"
      aria-disabled={pending || isErr}
      disabled={pending || isErr}
    >
      {label}{" "}
      {!pending ? (
        <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      ) : (
        <Loader2Icon className="ml-auto h-5 w-5 text-gray-50 animate-spin" />
      )}
    </button>
  );
}
