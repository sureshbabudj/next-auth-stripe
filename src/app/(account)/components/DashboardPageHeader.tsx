import Link from "next/link";
import { DashboardSideNavLink } from "../static-data";
import React from "react";
import { StickyNoteIcon } from "lucide-react";

export function DashboardPageInnerLinks({
  links,
}: {
  links: Omit<DashboardSideNavLink, "icon">[];
}) {
  const linkClass =
    "px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5";
  const activeLinkClass =
    "px-3 border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white pb-1.5";
  return (
    <div className="flex items-center space-x-3 sm:mt-7 mt-4">
      {links.map((link) => (
        <Link
          href={link.path}
          key={link.name}
          className={link.active ? activeLinkClass : linkClass}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}

export interface DashboardPageTitleProps {
  title: string;
  icon?: any;
}

export function DashboardPageTitle({
  children,
  title,
  icon,
}: React.PropsWithChildren<DashboardPageTitleProps>) {
  const Icon = icon ? icon : StickyNoteIcon;
  return (
    <div className="flex w-full items-center">
      <div className="flex items-center text-3xl text-gray-900 dark:text-white">
        <Icon className="w-12 h-12 p-2 mr-4 rounded-full border border-solid border-gray-200 text-gray-600" />
        {title}
      </div>
      {children}
    </div>
  );
}

export interface DashboardPageHeaderProps {}

export function DashboardPageHeader({
  children,
}: React.PropsWithChildren<DashboardPageHeaderProps>) {
  return (
    <div className="sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800 sticky top-0 z-[1]">
      {children}
    </div>
  );
}
