
import { NavLinks } from "./NavLinks";
import { UserMenu } from "./UserMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CartButton } from "./CartButton";

interface DesktopNavProps {
  navLinks: Array<{
    name: string;
    href: string;
    isExternal?: boolean;
    adminOnly?: boolean;
  }>;
  cartItemsCount: number;
}

export function DesktopNav({ navLinks, cartItemsCount }: DesktopNavProps) {
  return (
    <nav className="flex items-center gap-6">
      <NavLinks links={navLinks} />
      
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Cart button with badge */}
      <CartButton itemsCount={cartItemsCount} />
      
      <UserMenu />
    </nav>
  );
}
