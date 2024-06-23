import { ShortLogo } from "@/app/ui/logo";

export function DashboardSideNav({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-white dark:bg-gray-900 dark:border-gray-800 w-20 flex-shrink-0 border-r border-gray-200 flex-col hidden sm:flex">
      <div className="h-16 flex items-center justify-center text-4xl">
        <ShortLogo href="/dashboard" />
      </div>
      {children}
    </div>
  );
}
