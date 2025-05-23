
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CartButtonProps {
  itemsCount: number;
  variant?: "desktop" | "mobile";
}

export function CartButton({ itemsCount, variant = "desktop" }: CartButtonProps) {
  const navigate = useNavigate();
  
  if (variant === "mobile") {
    return (
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => navigate('/menu')}
        className="text-white dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 relative"
      >
        <ShoppingCart className="h-5 w-5" />
        {itemsCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-krecao-red text-white text-xs h-5 min-w-5 flex items-center justify-center rounded-full">
            {itemsCount}
          </Badge>
        )}
      </Button>
    );
  }
  
  return (
    <Button 
      variant="ghost" 
      onClick={() => navigate('/menu')}
      className="text-white dark:text-white rounded font-normal bg-transparent relative"
    >
      <ShoppingCart className="h-5 w-5" />
      {itemsCount > 0 && (
        <Badge className="absolute -top-2 -right-2 bg-krecao-red text-white text-xs h-5 min-w-5 flex items-center justify-center rounded-full">
          {itemsCount}
        </Badge>
      )}
    </Button>
  );
}
