
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NavLinks } from "./NavLinks";
import { UserMenu } from "./UserMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CartButton } from "./CartButton";

interface MobileNavProps {
  navLinks: Array<{
    name: string;
    href: string;
    isExternal?: boolean;
    adminOnly?: boolean;
  }>;
  cartItemsCount: number;
}

export function MobileNav({ navLinks, cartItemsCount }: MobileNavProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center gap-3">
      {/* Theme Toggle for mobile */}
      <ThemeToggle variant="toggle" />
      
      {/* Cart button with badge for mobile */}
      <CartButton itemsCount={cartItemsCount} variant="mobile" />
      
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-black/95 text-white border-gray-800 dark:bg-black/95 dark:text-white dark:border-gray-800">
          <div className="flex justify-center mb-8 mt-4">
            <img src="/lovable-uploads/93e5cd42-eca6-41a9-92d5-35b49e1d113f.png" alt="K-recão Lanches" className="h-16" />
          </div>
          <nav className="flex flex-col gap-6">
            <UserMenu isMobile={true} />
            
            <NavLinks links={navLinks} variant="mobile" />

            <div className="space-y-4 mt-6">
              <Button 
                onClick={() => navigate("/menu")} 
                className="w-full bg-krecao-red hover:bg-krecao-red/90 text-white"
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> 
                {cartItemsCount > 0 ? `Meu Carrinho (${cartItemsCount})` : 'Pedir Agora'}
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
