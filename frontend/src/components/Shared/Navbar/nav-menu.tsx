import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
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

export const NavMenu = (props: NavigationMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="flex flex-col gap-8 -mt-40 md:mt-0 font-medium">
      {menuItems.map((item) => (
        <NavigationMenuItem key={item.name}>
          <NavigationMenuLink asChild>
            <Link
              href={item.href}
              className="ml-4 md:ml-0 w-20 hover:text-white dark:text-foreground hover:bg-primary transition-all text-sm tracking-wide"
            >
              {item.name}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
      <div className="absolute -bottom-30 dark:text-foreground hover:bg-primary rounded-full"> 
        <ModeToggle/>
      </div>
    </NavigationMenuList>
  </NavigationMenu>
);
