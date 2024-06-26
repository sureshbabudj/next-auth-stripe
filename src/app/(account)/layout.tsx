import "../globals.css";
import {
  DasboardHeader,
  DashboardHeaderMenu,
  DasboardHeaderRightMenu,
} from "./components/DasboardHeader";
import { DashboardSideNav } from "./components/DashboardSideNav";
import { leftNavBarIcons, dashboardHeaderMenuLinks } from "./static-data";
import { DashboardSideNavLinks } from "./components/DashboardSideNavLinks";

export const metadata = {
  title: "Dashboard | Super Store",
  description: "Manage your products, account and more",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
      <DashboardSideNav>
        <DashboardSideNavLinks links={leftNavBarIcons} />
      </DashboardSideNav>
      <div className="flex-grow overflow-hidden h-full flex flex-col">
        <DasboardHeader>
          <DashboardHeaderMenu links={dashboardHeaderMenuLinks} />
          <DasboardHeaderRightMenu />
        </DasboardHeader>
        {children}
      </div>
    </div>
  );
}
