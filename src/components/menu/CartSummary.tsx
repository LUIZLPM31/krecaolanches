
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  onCheckout: () => void;
}

const CartSummary = ({ totalItems, totalPrice, onCheckout }: CartSummaryProps) => {
  // Format price according to Brazilian standards
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 animate-fade-in">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5 text-krecao-yellow" />
            <div>
              <span className="text-sm md:text-base">
                {totalItems}{" "}
                {totalItems === 1 ? "item" : "itens"}{" "}
                no carrinho
              </span>
              <p className="text-krecao-yellow font-bold">
                Total: {formatPrice(totalPrice)}
              </p>
            </div>
          </div>
          <Button
            onClick={onCheckout}
            className="bg-krecao-yellow text-black hover:bg-krecao-yellow/90 w-full md:w-auto"
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Pedir via WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
