"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="w-full border-b sticky top-0 bg-white z-50 shadow-sm">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-[#d4af37]">
          GHJ
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-[#d4af37] transition"
            >
              {link.name}
            </Link>
          ))}

          {/* Cart Icon with Badge */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="text-gray-700 hover:text-[#d4af37]" size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="flex flex-col md:hidden bg-white border-t px-4 py-2 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-[#dfaf37] transition"
            >
              {link.name}
            </Link>
          ))}
          {/* Mobile Cart Link */}
          <Link
            href="/cart"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-gray-700 hover:text-[#dfaf37]"
          >
            <ShoppingCart size={20} />
            Cart {totalItems > 0 && `(${totalItems})`}
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
