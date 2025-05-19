
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { X, BadgePercent, CupSoda } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function PromotionalBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!isVisible) {
    return null;
  }

  const discountPercentage = user ? 13 : 10;

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-40 animate-fade-in">
      <div className="bg-gradient-to-r from-krecao-red to-krecao-red/80 text-white py-3 px-4 rounded-r-lg shadow-lg max-w-[280px] relative">
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center">
            <BadgePercent className="h-5 w-5 mr-2 text-krecao-yellow" />
            <span className="font-bold">PROMOÇÃO:</span>
          </div>
          
          <p className="text-sm">
            <span className="font-bold">{discountPercentage}% OFF</span> no cardápio promocional
            {!user && (
              <span className="block mt-1">
                • <span className="underline">Cadastre-se</span> para {" "}
                <span className="font-bold">13% OFF</span> + refrigerante mini grátis!
              </span>
            )}
            {user && (
              <span className="block mt-1">
                • <CupSoda className="h-4 w-4 inline-block" /> Ganhe um refrigerante mini grátis!
              </span>
            )}
          </p>
          
          <Button 
            className="bg-krecao-yellow text-black hover:bg-krecao-yellow/90 px-4 py-1 h-auto text-sm w-full"
            onClick={() => navigate("/menu")}
          >
            Ver Menu Promocional
          </Button>
        </div>
        
        <button 
          className="absolute right-2 top-2 text-white hover:text-krecao-yellow"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
