"use client";

import { useState } from "react";
import {
  DashboardPagination,
  DashboardPaginationProps,
} from "../components/DashboardPagination";
import {
  DashboardTableWrapper,
  DasboardTableHeader,
  DasboardTableHeaderRight,
} from "../components/DashboardTable";
import { getUserProducts } from "@/app/lib/product.actions";
import { Product } from "@prisma/client";
import {
  ArrowDownUpIcon,
  CalendarFold,
  EllipsisIcon,
  TerminalIcon,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { formatPrice } from "@/app/lib/utils";
import { useSearchParams } from "next/navigation";

interface ProductListImageProps extends React.HTMLAttributes<HTMLImageElement> {
  product: Product;
}

const ProductListImage = ({
  product,
  className,
  ...props
}: ProductListImageProps) => {
  if (!product.images) return null;

  const images = product.images.split(",");

  if (images.length === 0) return null;

  return (
    //  eslint-disable-next-line @next/next/no-img-element
    <img
      src={images[0]}
      alt={product.description}
      className="w-12 h-12 aspect-square border border-gray-200 rounded-full"
    />
  );
};

export function ProductsTable({
  currentPage: initialPage,
  limit,
  products: initailProducts,
  totalProducts: initailTotal,
  sort: initialSort,
}: { products: Product[]; sort?: string } & Pick<
  DashboardPaginationProps,
  "limit" | "currentPage" | "totalProducts"
>) {
  const [products, setProducts] = useState(initailProducts);
  const [totalProducts, setTotalProducts] = useState(initailTotal);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [error, setError] = useState<string>("");
  const searchParams = useSearchParams();

  const tableHeaders = [
    { title: "Id", value: "id", className: "text-left" },
    { title: "", value: "images" },
    { title: "Name", value: "name", className: "text-left" },
    { title: "Category", value: "category", className: "text-left" },
    { title: "Archived", value: "archived", className: "text-center" },
    { title: "Price", value: "price", className: "text-right" },
  ];

  const sortParams = [
    { title: "Default", field: "", sortDirection: "" },
    { title: "Highest Price", field: "price", sortDirection: "asc" },
    { title: "Lowest Price", field: "price", sortDirection: "desc" },
  ];

  const handlePaginationChange = async ({
    currentPage,
    sortDirection,
    sort,
  }: {
    currentPage: number;
    sortDirection?: "asc" | "desc";
    sort?: string;
  }) => {
    const { err, products, totalProducts } = await getUserProducts({
      page: currentPage,
      limit,
      asc: sortDirection === "asc",
      sortBy: sort,
    });
    if (err) {
      setError(err);
      return;
    }
    setProducts(products);
    setTotalProducts(totalProducts);
    setCurrentPage(currentPage);

    const params = new URLSearchParams(searchParams.toString());
    params.set("current-page", String(currentPage));
    if (sort) {
      const sortValue = sortParams.find(
        (i) => i.field === sort && i.sortDirection === sortDirection
      );
      sortValue?.title && params.set("sort", sortValue.title);
    } else {
      params.delete("sort");
    }
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const handleSort = (sort: string) => {
    setCurrentPage(1);
    switch (sort) {
      case sortParams[1].title:
        handlePaginationChange({
          currentPage: 1,
          sortDirection: "asc",
          sort: "price",
        });
        break;
      case sortParams[2].title:
        handlePaginationChange({
          currentPage: 1,
          sortDirection: "desc",
          sort: "price",
        });
        break;
      default:
        handlePaginationChange({ currentPage: 1 });
    }
  };

  if (error) {
    return (
      <Alert>
        <TerminalIcon className="h-4 w-4" />
        <AlertTitle>Network Error!</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <DashboardTableWrapper>
      <DasboardTableHeader>
        <Select>
          <SelectTrigger className="w-[12rem]">
            <CalendarFold className="text-gray-400 w-5 h-5" />
            <SelectValue placeholder="Last 30 Days" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <DasboardTableHeaderRight>
          <Select onValueChange={handleSort} defaultValue={initialSort}>
            <SelectTrigger className="w-[12rem]">
              <ArrowDownUpIcon className="text-gray-400 w-5 h-5" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              {sortParams.map((param) => (
                <SelectItem key={param.title} value={param.title}>
                  {param.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </DasboardTableHeaderRight>
      </DasboardTableHeader>

      <Table>
        <TableHeader>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableHead key={header.value} className={header.className}>
                {header.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{product.id}</TableCell>
              <TableCell>
                <ProductListImage product={product} />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="text-center">
                {product.archived ? <>✅</> : <>❎</>}
              </TableCell>
              <TableCell className="text-right">
                {formatPrice(product.price)}
              </TableCell>
              <TableCell className="text-right">
                <EllipsisIcon className="rounded-full h-8 w-8 p-2 border border-gray-200" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DashboardPagination
        currentPage={currentPage}
        limit={limit}
        totalProducts={totalProducts}
        onChange={handlePaginationChange}
      />
    </DashboardTableWrapper>
  );
}
