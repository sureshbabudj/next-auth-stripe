import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Logo from "./logo";
import {
  BellIcon,
  BookUserIcon,
  LockOpenIcon,
  PenToolIcon,
  PowerOffIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { auth } from "@/auth";
import Link from "next/link";
import { SignOutItem } from "./signout-item";

export async function MainMenubar() {
  const session = await auth();
  return (
    <Menubar className="border-0 border-b-[1px] rounded-none py-6">
      <div className="flex ">
        <MenubarMenu>
          <MenubarTrigger className="text-xl">
            <Logo responsive={true} />
          </MenubarTrigger>
        </MenubarMenu>
      </div>
      <div className="flex grow justify-end">
        <MenubarMenu>
          <MenubarTrigger>
            <ShoppingCartIcon className="w-4 h-4" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Window <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>New Incognito Window</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Email link</MenubarItem>
                <MenubarItem>Messages</MenubarItem>
                <MenubarItem>Notes</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              Print... <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <BellIcon className="w-4 h-4" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Find</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Search the web</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Find...</MenubarItem>
                <MenubarItem>Find Next</MenubarItem>
                <MenubarItem>Find Previous</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        {session?.user ? (
          <MenubarMenu>
            <MenubarTrigger>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://avatars.githubusercontent.com/u/12957760"
                className="rounded-full h-7 w-7"
                alt=""
                loading="lazy"
              />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarSeparator />
              <MenubarItem>
                <Link
                  href="/dashboard"
                  className="flex justify-center content-center"
                >
                  <BookUserIcon className="w-4 h-4 mr-2" />
                  {session.user.name ?? "Account"}
                </Link>
              </MenubarItem>
              <MenubarSeparator />

              <SignOutItem className="flex content-center p-2 text-sm w-full hover:bg-gray-100 rounded-sm">
                <PowerOffIcon className="w-4 h-4 mr-2" /> Sign Out
              </SignOutItem>
            </MenubarContent>
          </MenubarMenu>
        ) : (
          <>
            <MenubarMenu>
              <MenubarTrigger>
                <Link
                  href="/auth/signin"
                  className="flex justify-center content-center"
                >
                  <LockOpenIcon className="w-4 h-4 mr-2" /> SignIn
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Link
                  href="/auth/register"
                  className="flex justify-center content-center"
                >
                  <PenToolIcon className="w-4 h-4 mr-2" /> Register
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
          </>
        )}
      </div>
    </Menubar>
  );
}
