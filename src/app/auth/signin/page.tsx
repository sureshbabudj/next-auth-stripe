import LoginForm from "@/app/ui/login-form";
import Logo from "@/app/ui/logo";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex w-full items-end rounded-l p-3 justify-center">
          <div className="text-5xl">
            <Logo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
