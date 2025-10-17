import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavMenu } from "./nav-menu";
import Image from "next/image";
import Link from "next/link";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col items-center mt-8">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.jpg"
            alt=""
            width={40}
            height={40}
            className="rounded-full border-2 bg-green-500"
          />
          <span className="font-semibold text-lg text-gray-800 geist_a71539c9-module__T19VSG__className">ANIKA JUMANA</span>
        </Link>
        <NavMenu orientation="vertical" className="mt-12" />
      </SheetContent>
    </Sheet>
  );
};
