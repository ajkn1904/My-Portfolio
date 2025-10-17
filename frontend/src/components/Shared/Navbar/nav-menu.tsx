import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/" },
  { name: "Skills", href: "/" },
  { name: "Projects", href: "/" },
  { name: "Contact", href: "/" },
  { name: "Blog", href: "/blogs" },
  { name: "Login", href: "/login" },
];

export const NavMenu = (props: NavigationMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="flex flex-col gap-8 items-center justify-center font-medium">
      {menuItems.map((item) => (
        <NavigationMenuItem key={item.name}>
          <NavigationMenuLink asChild>
            <Link
              href={item.href}
              className="text-gray-700 hover:text-purple-500 transition-all text-sm tracking-wide"
            >
              {item.name}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);
