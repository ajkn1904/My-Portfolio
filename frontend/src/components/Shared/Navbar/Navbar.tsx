"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

const Navbar = () => {
  return (
    <nav className="fixed left-0 top-0 h-screen w-[90px] bg-white border-r border-gray-200 flex flex-col items-center justify-between py-8 shadow-sm z-30">
      {/* Top Section */}
      <div className="flex flex-col items-center space-y-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <NavMenu className="hidden md:flex flex-col items-center" />
      </div>
      {/* Bottom Icon (Settings or Social) */}
      {/* <div className="flex flex-col items-center">
        <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center text-sm">
          Login
        </button>
      </div> */}

      {/* Mobile Menu Trigger */}
      <div className="md:hidden">
        <NavigationSheet />
      </div>

    </nav>
  );
};

export default Navbar;
