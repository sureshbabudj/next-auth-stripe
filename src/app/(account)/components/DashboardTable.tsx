import { formatDate } from "@/app/lib/utils";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CalendarFold, EllipsisIcon } from "lucide-react";

export function DasboardTableHeaderRight({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLSpanElement>>) {
  return (
    <div
      className={cn(
        "ml-auto text-gray-500 text-xs sm:inline-flex hidden items-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function DasboardTableHeader({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLSpanElement>>) {
  return (
    <div className={cn("flex w-full items-center mb-7", className)} {...props}>
      {children}
    </div>
  );
}

export function formatUIValue(value: any) {
  if (typeof value === "string") {
    // Check if the string is a comma-separated list of URLs
    const urls = value.split(",").map((url) => url.trim());
    if (urls.every((url) => url.startsWith("http"))) {
      // If all items are URLs, return img or video tags
      return urls.map((url, i) =>
        url.includes(".jpg") ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={url} alt="" />
        ) : (
          <video key={i} src={url} />
        )
      );
    }
  } else if (typeof value === "boolean") {
    // For boolean values, return a check mark for true and a cross for false
    return value ? "✔️" : "❌";
  } else if (value instanceof Date) {
    // For date values, return a formatted date string
    return formatDate(value, "MMMM dd, yyyy");
  }
  // For other types of values, just return the value
  return value;
}

export interface TableProps<T extends { [s: string]: any } | ArrayLike<any>> {
  headers: string[];
  data: T[];
}

export function DashboardTable<
  T extends { [s: string]: any } | ArrayLike<any>
>({ headers, data }: TableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            {Object.values(item).map((value, i) => (
              <TableCell key={i}>{formatUIValue(value)}</TableCell>
            ))}
            <TableCell>
              <EllipsisIcon className="rounded-full h-8 w-8 p-2 border border-gray-200" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function DashboardTableWrapper({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={cn("sm:p-7 p-4", className)} {...props}>
      {children}
    </div>
  );
}
