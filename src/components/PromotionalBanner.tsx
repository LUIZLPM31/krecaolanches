
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { X, BadgePercent, CupSoda } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";

export function PromotionalBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  if (!isVisible) {
    return null;
  }

  const discountPercentage = user ? 13 : 10;

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-40 animate-fade-in">
      <div 
        className={`bg-gradient-to-r from-krecao-red/60 to-krecao-red/50 backdrop-blur-sm text-white 
                   rounded-r-lg shadow-lg relative
                   ${isMobile ? 'max-w-[200px] py-1.5 px-2' : 'max-w-[260px] py-2 px-3'}`}
      >
        <div className="flex flex-col items-start gap-1.5">
          <div className="flex items-center">
            <BadgePercent className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} mr-1.5 text-krecao-yellow`} />
            <span className={`font-bold ${isMobile ? 'text-xs' : 'text-sm'}`}>PROMOÇÃO:</span>
          </div>
          
          <p className={`${isMobile ? 'text-[10px]' : 'text-xs'}`}>
            <span className="font-bold">{discountPercentage}% OFF</span> no cardápio promocional
            {!user && (
              <span className="block mt-0.5">
                • <span className="underline">Cadastre-se</span> para {" "}
                <span className="font-bold">13% OFF</span> + refrigerante mini grátis!
              </span>
            )}
            {user && (
              <span className="block mt-0.5">
                • <CupSoda className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} inline-block`} /> Refrigerante mini grátis na primeira compra!
              </span>
            )}
          </p>
          
          <Button 
            className={`bg-krecao-yellow text-black hover:bg-krecao-yellow/90 h-auto w-full 
                      ${isMobile ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-0.5 text-xs'}`}
            onClick={() => navigate("/menu")}
          >
            Ver Menu Promocional
          </Button>
        </div>
        
        <button 
          className="absolute right-1 top-0.5 text-white hover:text-krecao-yellow"
          onClick={() => setIsVisible(false)}
        >
          <X className={`${isMobile ? 'h-2.5 w-2.5' : 'h-3 w-3'}`} />
        </button>
      </div>
    </div>
  );
}
