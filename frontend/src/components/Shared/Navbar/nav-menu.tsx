"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./modeToggler";

const menuItems = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "#about" },
  { name: "SKILLS", href: "#skills" },
  { name: "PROJECTS", href: "#projects" },
  { name: "CONTACT", href: "#contact" },
  { name: "BLOG", href: "/blogs" },
  { name: "LOGIN", href: "/login" },
];

interface NavMenuProps {
  className?: string;
  onLinkClick?: () => void; // optional callback for mobile menu
}

export const NavMenu = ({ className, onLinkClick }: NavMenuProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault(); // prevent default anchor jump
      if (pathname === "/") {
        const el = document.getElementById(href.replace("#", ""));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/${href}`);
      }
    } 
    // close mobile menu if callback provided
    if (onLinkClick) onLinkClick();
  };

  return (
    <NavigationMenu>
      <NavigationMenuList className={`flex flex-col gap-8  md:mt-0 font-medium ${className}`}>
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.name}>
            <NavigationMenuLink asChild>
              <a
                href={item.href}
                onClick={(e) => handleClick(item.href, e)}
                className="ml-4 md:ml-0 w-20 hover:text-white dark:text-foreground hover:bg-primary transition-all text-sm tracking-wide"
              >
                {item.name}
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}

        {/* Keep ModeToggle at same absolute position */}
        <div className="absolute -bottom-30 dark:text-foreground hover:bg-primary rounded-full">
          <ModeToggle />
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
