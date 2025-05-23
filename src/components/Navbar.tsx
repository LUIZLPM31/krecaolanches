
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { MobileNav } from "./navbar/MobileNav";
import { DesktopNav } from "./navbar/DesktopNav";

interface NavLink {
  name: string;
  href: string;
  isExternal?: boolean;
  adminOnly?: boolean;
}

export function Navbar() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const { user } = useAuth();
  const { getTotalItems } = useCart();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navLinks: NavLink[] = [
    {
      name: "Início",
      href: "/"
    },
    {
      name: "Cardápio",
      href: "/menu"
    },
    {
      name: "Admin",
      href: "/admin",
      adminOnly: true
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is admin
    const checkAdminStatus = async () => {
      if (user) {
        // This is a simple check - in a real app, you might want to query the database
        const isUserAdmin = user?.app_metadata?.role === "admin";
        setIsAdmin(isUserAdmin);
      }
    };
    checkAdminStatus();
  }, [user]);

  // Filter links based on user's admin status
  const filteredNavLinks = navLinks.filter(link => !link.adminOnly || link.adminOnly && isAdmin);
  
  // Get cart items count
  const cartItemsCount = getTotalItems();
  
  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/90 dark:bg-black/90 backdrop-blur-sm py-4 shadow-lg" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/lovable-uploads/93e5cd42-eca6-41a9-92d5-35b49e1d113f.png" alt="K-recão Lanches" className="h-12 md:h-14" />
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <DesktopNav navLinks={filteredNavLinks} cartItemsCount={cartItemsCount} />
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <MobileNav navLinks={filteredNavLinks} cartItemsCount={cartItemsCount} />
        )}
      </div>
    </header>
  );
}
