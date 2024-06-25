import { RegisterForm } from "@/app/ui/login-form";
import Logo from "@/app/ui/logo";

export default function RegisterPage({
  searchParams: { err },
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div className="flex w-full items-end rounded-l p-3 justify-center">
          <div className="text-5xl flex">
            <Logo />
          </div>
        </div>
        {err && (
          <p className="px-4 py-2 my-1 rounded bg-yellow-50 text-red-500 text-sm">
            {decodeURIComponent(Array.isArray(err) ? err[0] : err)}
          </p>
        )}
        <RegisterForm />
      </div>
    </main>
  );
}
