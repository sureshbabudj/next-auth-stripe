"use client";

import Link from "next/link";
import { DashboardSideNavLink } from "../static-data";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  LayoutGridIcon,
  PackageIcon,
  ReceiptIcon,
} from "lucide-react";

export function DashboardSideNavLinks({
  links,
}: {
  links: DashboardSideNavLink[];
}) {
  const pathName = usePathname();
  const renderIcon = (icon: string) => {
    switch (icon) {
      case "home":
        return <HomeIcon />;
      case "package":
        return <PackageIcon />;
      case "receipt":
        return <ReceiptIcon />;
      case "layout-grid":
        return <LayoutGridIcon />;
    }
  };
  const linkClass =
    "h-10 w-12 dark:text-gray-500 rounded-md flex items-center justify-center";
  const activeLinkClass =
    "h-10 w-12 dark:bg-gray-700 dark:text-white rounded-md flex items-center justify-center bg-blue-100 text-blue-500";
  return (
    <div className="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-4">
      {links.map((link, index) => (
        <Link
          href={link.path}
          title={link.name}
          key={index}
          className={link.path === pathName ? activeLinkClass : linkClass}
        >
          {renderIcon(link.icon)}
        </Link>
      ))}
    </div>
  );
}
