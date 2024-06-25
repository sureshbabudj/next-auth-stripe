"use client";

import {
  DropdoemMenuTriggerEllipsis,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DashboardPageHeaderActionMenu } from "../components/DashboardPageHeaderActionMenu";
import { ProductPageHeaderAction } from "./ProductForm";

export function ProductsPageActionMenu() {
  return (
    <DashboardPageHeaderActionMenu>
      <ProductPageHeaderAction />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <DropdoemMenuTriggerEllipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </DashboardPageHeaderActionMenu>
  );
}
