"use client";

export interface DashboardPageHeaderActionProps {
  actionTitle: string;
  onActionClick?: () => void;
}

export function DashboardPageHeaderAction({
  actionTitle,
  onActionClick,
}: React.PropsWithChildren<DashboardPageHeaderActionProps>) {
  const handleClick = () => onActionClick && onActionClick();
  return (
    <div className="text-right">
      <button
        className="text-sm dark:text-white bg-pink-600 px-4 py-2 rounded text-white"
        onClick={handleClick}
      >
        {actionTitle}
      </button>
    </div>
  );
}

export function DashboardPageHeaderActionMenu({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div className="ml-auto sm:flex hidden items-center justify-end">
      {children}
    </div>
  );
}
