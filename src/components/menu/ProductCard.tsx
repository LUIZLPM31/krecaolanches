
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart, onViewDetails }: ProductCardProps) => {
  return (
    <Card className="bg-gray-900 border border-gray-800 overflow-hidden hover:border-krecao-yellow transition-all duration-300 group card-hover animate-fade-in cursor-pointer">
      <div className="flex flex-col md:flex-row h-full" onClick={() => onViewDetails(product)}>
        <div className="md:w-1/3 relative overflow-hidden">
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-48 md:h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" 
          />
          <div className="absolute top-0 left-0 bg-krecao-red px-2 py-1 text-xs font-bold animate-slide-down">
            {product.category}
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>
        
        <div className="p-6 md:w-2/3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-white group-hover:text-krecao-yellow transition-colors duration-300 animate-slide-right">
                {product.name}
              </h3>
              <span className="bg-krecao-yellow text-black px-3 py-1 rounded-full text-sm font-bold animate-bounce-in hover-glow">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300 animate-slide-up">
              {product.description}
            </p>
          </div>
          
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }} 
            className="bg-krecao-red hover:bg-krecao-yellow text-slate-100 hover:text-black transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 rounded-full shadow-lg hover:shadow-krecao-yellow/30 btn-bounce btn-ripple interactive-element focus-ring"
          >
            <Plus className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-90" /> 
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
