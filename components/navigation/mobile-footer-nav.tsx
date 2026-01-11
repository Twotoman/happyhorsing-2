"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navItems } from "@/components/navigation/nav-items";

export function MobileFooterNav() {
  const pathname = usePathname();
  const items = navItems.filter((item) => item.mobile);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/80 backdrop-blur">
      <ul
        className="grid h-16"
        style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
      >
        {items.map((item) => {
          const isActive = (pathname: string, url: string) => {
            if (url === "/dashboard") return pathname === "/dashboard";
            return pathname === url || pathname.startsWith(url + "/");
          };

          const active = isActive(pathname, item.url);

          const Icon = item.icon;

          return (
            <li key={item.url}>
              <Link
                href={item.url}
                className={cn(
                  "group flex h-full flex-col items-center justify-center gap-0.5",
                  "transition-colors duration-200",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl",
                    "transition-colors duration-200",
                    active
                      ? "bg-primary/10"
                      : "group-hover:bg-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>

                {/* Label */}
                <span
                  className={cn(
                    "text-[11px] leading-none",
                    active && "font-medium"
                  )}
                >
                  {item.title}
                </span>

                {/* Active Dot (immer Platz reserviert) */}
                <span
                  className={cn(
                    "mt-0.5 h-1 w-1 rounded-full transition-opacity duration-200",
                    active ? "bg-primary opacity-100" : "opacity-0"
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
