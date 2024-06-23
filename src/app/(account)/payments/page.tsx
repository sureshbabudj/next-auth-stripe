import { DashboardPageSidebar } from "../components/DashboardPageSidebar";
import { DashboardPageSidebarSearch } from "../components/DashboardPageSidebarSearch";
import { dashboardPageInnerLinks } from "../static-data";
import {
  DashboardPageHeader,
  DashboardPageInnerLinks,
  DashboardPageTitle,
} from "../components/DashboardPageHeader";
import { ReceiptIcon } from "lucide-react";
import {
  DashboardPageHeaderAction,
  DashboardPageHeaderActionMenu,
} from "../components/DashboardPageHeaderActionMenu";
import { DasboardTableHeader } from "../components/DashboardTable";
import { DashboardPagination } from "../components/DashboardPagination";
import { PaymentsTable } from "./table";

export default async function Payments() {
  return (
    <div className="flex-grow flex overflow-x-hidden">
      <DashboardPageSidebar title="Payments">
        <DashboardPageSidebarSearch />
      </DashboardPageSidebar>
      <div className="flex-grow bg-white dark:bg-gray-900 overflow-y-auto">
        <DashboardPageHeader>
          <DashboardPageTitle title="Payments" icon={ReceiptIcon}>
            <DashboardPageHeaderActionMenu>
              <DashboardPageHeaderAction actionTitle="Raise Dispute" />
            </DashboardPageHeaderActionMenu>
          </DashboardPageTitle>
          <DashboardPageInnerLinks links={dashboardPageInnerLinks} />
        </DashboardPageHeader>
        <div className="sm:p-7 p-4">
          <DasboardTableHeader />
          <PaymentsTable />
          <DashboardPagination currentPage={1} limit={10} totalProducts={40} />
        </div>
      </div>
    </div>
  );
}
