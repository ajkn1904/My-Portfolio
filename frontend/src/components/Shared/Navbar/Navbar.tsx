"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

const Navbar = () => {
  return (
    <nav className="fixed md:left-0 top-0 h-[50px] md:h-screen w-full md:w-[90px] bg-accent flex md:flex-col items-center justify-between py-8 shadow-sm z-30">

      <div className="flex flex-col items-center">

        <Link href="/" className="flex justify-center items-center mx-5 md:mb-8">
          <Logo/>
          <span className="font-bold text-2xl md:hidden">ANIKA JUMANA</span>
        </Link>

        {/* Desktop Navigation */}
        <NavMenu className="hidden md:flex flex-col items-center" />
      </div>

      {/* Mobile Menu Trigger */}
      <div className="md:hidden mr-5">
        <NavigationSheet />
      </div>


    </nav>
  );
};

export default Navbar;
