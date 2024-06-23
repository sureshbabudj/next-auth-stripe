import Link from "next/link";

import { BookUserIcon, ChevronDownIcon, PowerOffIcon } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { SignOutItem } from "@/app/ui/signout-item";
import { auth } from "@/auth";
import { DashboardSideNavLink } from "../static-data";

export async function DasboardHeaderRightMenu() {
  const session = await auth();
  return (
    <div className="ml-auto flex items-center space-x-7">
      <Menubar className="border-0 border-b-[1px] rounded-none m-0 py-2 bg-transparent justify-end">
        <MenubarMenu>
          <MenubarTrigger>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://avatars.githubusercontent.com/u/12957760"
              className="rounded-full h-7 w-7"
              alt=""
              loading="lazy"
            />
            <span className="block mx-1 text.xs text-gray-500">
              {session!.user.name}
            </span>
            <ChevronDownIcon className="w-4" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarSeparator />
            <MenubarItem>
              <Link
                href="/profile"
                className="flex justify-center content-center"
              >
                <BookUserIcon className="w-4 h-4 mr-2" />
                Account
              </Link>
            </MenubarItem>
            <MenubarSeparator />
            <SignOutItem className="flex content-center p-2 text-sm w-full hover:bg-gray-100 rounded-sm">
              <PowerOffIcon className="w-4 h-4 mr-2" /> Sign Out
            </SignOutItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export function DashboardHeaderMenu({
  links,
}: {
  links: Omit<DashboardSideNavLink, "icon">[];
}) {
  const linkClass =
    "cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-8 last-of-type:mr-0";
  const activeLinkClass =
    "cursor-pointer h-full border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white inline-flex mr-8 items-center";
  return (
    <div className="flex h-full text-gray-600 dark:text-gray-400">
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

export function DasboardHeader({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-10 lg:flex w-full border-b border-gray-200 dark:border-gray-800 hidden pl-10 pr-4">
      {children}
    </div>
  );
}
