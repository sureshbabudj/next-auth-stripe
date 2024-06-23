import { cn } from "@/lib/utils";
import Link from "next/link";

export function ShortLogo({
  href,
  ...props
}: React.HTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <Link href={href} {...props}>
      🛍️
    </Link>
  );
}

export default function Logo({ responsive = false }: { responsive?: boolean }) {
  return (
    <>
      <span className="text-pink-500 mr-2">🛍️</span>
      <span
        className={cn("text-pink-500 mr-1", { "hidden md:block": responsive })}
      >
        Super
      </span>
      <span
        className={cn("text-yellow-600", { "hidden md:block": responsive })}
      >
        Store
      </span>
    </>
  );
}
