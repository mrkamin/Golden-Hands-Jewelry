"use client";
import Link from "next/link";
import { useState } from "react";
import {Menu, X} from "lucide-react";

const navLinks = [
  {name: "Home", href: "/"},
  {name: "Shop", href: "/shop"},
  {name: "About", href: "/about"},
  {name: "Contact", href:"/contact"},
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b sticky top-0 bg-white z-50 shadow-sm">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-[#d4af37]">
          GHJ
        </Link>
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-[#d4af37] transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? < X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isOpen && (
        <nav className="flex flex-col md:hidden bg-white border-t px-4 py-2 space-y-2">
          {
            navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-[#dfaf37] transition"
              >
                  {link.name}
              </Link>
            ))
          }
        </nav>
      )}
    </header>
  );
}

export default Header
