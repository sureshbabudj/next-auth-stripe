export function DashboardPageContent({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div className="flex-grow bg-white dark:bg-gray-900 overflow-y-auto">
      {children}
    </div>
  );
}

export function DashboardPage({ children }: React.PropsWithChildren<{}>) {
  return <div className="flex-grow flex overflow-x-hidden">{children}</div>;
}
