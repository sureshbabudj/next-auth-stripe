import { IconProps } from "../ui/Icon";

export interface DashboardSideNavLink extends IconProps {
  name: string;
  path: string;
  active: boolean;
}

export const leftNavBarIcons: DashboardSideNavLink[] = [
  {
    name: "",
    path: "#",
    active: false,
    icon: "home",
  },
  {
    name: "",
    path: "/dashboard",
    active: false,
    icon: "package",
  },
  {
    name: "",
    path: "/payments",
    active: false,
    icon: "receipt",
  },
  {
    name: "",
    path: "#",
    active: false,
    icon: "layout-grid",
  },
];

export const dashboardHeaderMenuLinks: Omit<DashboardSideNavLink, "icon">[] = [
  { name: "Products", path: "/dashboard", active: true },
  { name: "Purchases", path: "#", active: false },
  { name: "Billing", path: "#", active: false },
  { name: "Activity", path: "#", active: false },
];

export const dashboardPageInnerLinks: Omit<DashboardSideNavLink, "icon">[] = [
  { name: "Activities", path: "#", active: true },
  { name: "Transfer", path: "#", active: false },
  { name: "Budgets", path: "#", active: false },
  { name: "Notifications", path: "#", active: false },
  { name: "Cards", path: "#", active: false },
];
