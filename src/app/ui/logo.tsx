import { cn } from "@/lib/utils";
import Link from "next/link";

export function LogoSvg() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="48px"
      height="48px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <g transform="matrix(0.143672, 0, 0, 0.143672, -6.524586, -16.159513)">
        <g transform="matrix(6.533102, 0, 0, 6.533102, 76.038055, 113.421898)">
          <defs></defs>
          <g>
            <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 4c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2zm2-6c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm4 6c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2z"></path>
          </g>
        </g>
        <g transform="matrix(6.533102, 0, 0, 6.533102, 72.084152, 114.209045)">
          <defs></defs>
          <g>
            <path
              d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 4c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2zm2-6c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm4 6c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2z"
              style={{ fill: "rgb(238, 182, 42)" }}
            ></path>
          </g>
        </g>
      </g>
      <g transform="matrix(0.143672, 0, 0, 0.143672, -12.957192, -14.364479)">
        <g transform="matrix(6.533102, 0, 0, 6.533102, 76.038055, 113.421898)">
          <defs></defs>
          <g>
            <path
              d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 4c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2zm2-6c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm4 6c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2z"
              style={{ fill: "rgb(7, 7, 7)" }}
            ></path>
          </g>
        </g>
        <g transform="matrix(6.533102, 0, 0, 6.533102, 71.510239, 112.144775)">
          <defs></defs>
          <g>
            <path
              d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 4c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2zm2-6c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm4 6c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2z"
              style={{ fill: "rgb(226, 15, 180)" }}
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

export function ShortLogo({
  href,
  ...props
}: React.HTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <Link href={href} {...props}>
      <LogoSvg />
    </Link>
  );
}

export default function Logo({ responsive = false }: { responsive?: boolean }) {
  return (
    <>
      <span className="text-pink-500 mr-2">
        <LogoSvg />
      </span>
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
