"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./modeToggler";
import { useSession, signOut } from "next-auth/react";

const baseMenuItems = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "#about" },
  { name: "SKILLS", href: "#skills" },
  { name: "PROJECTS", href: "#projects" },
  { name: "CONTACT", href: "#contact" },
  { name: "BLOG", href: "/blogs" },
];

interface NavMenuProps {
  className?: string;
  onLinkClick?: () => void;
}

export const NavMenu = ({ className, onLinkClick }: NavMenuProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("home");
  const isScrollingRef = useRef(false);
  const { data: session } = useSession(); // ✅ detect logged-in user

  // Determine menu items based on auth status
  const menuItems = session
    ? [...baseMenuItems, { name: "DASHBOARD", href: "/dashboard" }]
    : [...baseMenuItems, { name: "LOGIN", href: "/login" }];

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionIds = menuItems
      .filter((m) => m.href.startsWith("#"))
      .map((m) => m.href.replace("#", ""));

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const viewportHeight = window.innerHeight;
      let currentSection = "home";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= viewportHeight / 2) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (href.startsWith("#")) {
      if (pathname === "/") {
        const el = document.getElementById(href.replace("#", ""));
        if (el) {
          isScrollingRef.current = true;
          setActiveSection(href.replace("#", ""));
          el.scrollIntoView({ behavior: "smooth", block: "start" });

          setTimeout(() => {
            isScrollingRef.current = false;
          }, 600);
        }
      } else {
        router.push(`/${href}`);
      }
    } else {
      router.push(href);
    }

    onLinkClick?.();
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && activeSection === "home";

    if (href.startsWith("#")) {
      const section = href.replace("#", "");
      return (
        (pathname === "/" && activeSection === section) ||
        (section === "projects" && pathname === "/projects")
      );
    }

    if (href === "/projects") {
      return pathname === "/projects" || activeSection === "projects";
    }

    return pathname === href;
  };

  return (
    <NavigationMenu>
      <NavigationMenuList
        className={`flex flex-col gap-8 md:mt-0 font-medium ${className}`}
      >
        {menuItems.map((item) => {
          const active = isActive(item.href);
          return (
            <NavigationMenuItem key={item.name}>
              <NavigationMenuLink asChild>
                <a
                  href={item.href}
                  onClick={(e) => handleClick(item.href, e)}
                  aria-current={active ? "page" : undefined}
                  className={`relative ml-4 md:ml-0 w-24 text-center transition-all text-sm tracking-wide py-1 ${
                    active
                      ? "font-bold"
                      : "text-gray-700 dark:text-gray-400 hover:font-bold hover:text-black dark:hover:text-foreground"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute left-0 right-0 bottom-0 h-[2px] bg-foreground transition-transform duration-300 ease-out origin-center ${
                      active
                        ? "scale-x-10 group-hover:scale-x-10 scale-y-150"
                        : "scale-x-0"
                    }`}
                  />
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}

        {/* ✅ Logout button (optional, visible if logged in) */}
        {session && (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-gray-700 dark:text-gray-400 hover:font-bold hover:text-black dark:hover:text-foreground"
          >
            Logout
          </button>
        )}

        <div className="absolute -bottom-30 dark:text-foreground rounded-full">
          <ModeToggle />
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
