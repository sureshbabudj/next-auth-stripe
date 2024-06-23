import { DashboardPageSidebar } from "../components/DashboardPageSidebar";
import { DashboardPageSidebarSearch } from "../components/DashboardPageSidebarSearch";
import { dashboardPageInnerLinks } from "../static-data";
import {
  DashboardPageHeader,
  DashboardPageInnerLinks,
  DashboardPageTitle,
} from "../components/DashboardPageHeader";
import { PackageIcon } from "lucide-react";
import {
  DashboardPage,
  DashboardPageContent,
} from "../components/DashboardPage";
import { ProductsPageActionMenu } from "./ProductsPageActionMenu";
import { ProductsTable } from "./ProductsTable";
import { getUserProducts } from "@/app/lib/product.actions";
import { getValueOrDefault } from "@/app/lib/utils";

export default async function Dashboard({
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentPage =
    Number(getValueOrDefault(searchParams["current-page"])) || 1;
  const limit = Number(getValueOrDefault(searchParams.limit)) || 10;

  const { products, totalProducts } = await getUserProducts(currentPage, limit);

  return (
    <DashboardPage>
      <DashboardPageSidebar title="Products">
        <DashboardPageSidebarSearch />
      </DashboardPageSidebar>
      <DashboardPageContent>
        <DashboardPageHeader>
          <DashboardPageTitle title="Products" icon={PackageIcon}>
            <ProductsPageActionMenu />
          </DashboardPageTitle>
          <DashboardPageInnerLinks links={dashboardPageInnerLinks} />
        </DashboardPageHeader>
        <ProductsTable
          products={products}
          currentPage={currentPage}
          limit={limit}
          totalProducts={totalProducts}
        />
      </DashboardPageContent>
    </DashboardPage>
  );
}
