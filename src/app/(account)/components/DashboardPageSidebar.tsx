export interface DashboardPageSidebarProps {
  title?: string;
}
export function DashboardPageSidebar({
  children,
  title,
}: React.PropsWithChildren<DashboardPageSidebarProps>) {
  return (
    <div className="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-5">
      {title && (
        <div className="text-xs text-gray-400 tracking-wider">{title}</div>
      )}
      {children}
    </div>
  );
}
