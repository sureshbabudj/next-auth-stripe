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
import {
  DashboardPageHeaderActionMenu,
  DashboardPageHeaderAction,
} from "../components/DashboardPageHeaderActionMenu";

export function ProductsPageActionMenu() {
  const handleCreateProduct = () => {
    console.log("create product");
  };
  return (
    <DashboardPageHeaderActionMenu>
      <DashboardPageHeaderAction
        actionTitle="Create Product"
        onActionClick={handleCreateProduct}
      />
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
