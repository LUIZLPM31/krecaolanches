
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
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card
      className="bg-gray-900 border border-gray-800 overflow-hidden hover:border-krecao-yellow transition-all duration-300 group"
    >
      <div className="flex flex-col md:flex-row h-full">
        <div className="md:w-1/3 relative">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-0 left-0 bg-krecao-red px-2 py-1 text-xs font-bold">
            {product.category}
          </div>
        </div>
        <div className="p-6 md:w-2/3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-white group-hover:text-krecao-yellow transition-colors">
                {product.name}
              </h3>
              <span className="bg-krecao-yellow text-black px-2 py-1 rounded text-sm font-bold">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <p className="text-gray-400 mb-4">{product.description}</p>
          </div>
          <Button
            onClick={() => onAddToCart(product)}
            className="bg-krecao-red hover:bg-krecao-red/90 group-hover:bg-krecao-yellow group-hover:text-black transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" /> Adicionar ao Carrinho
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
