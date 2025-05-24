
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sandwich, Utensils, Pizza, CupSoda } from "lucide-react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

interface MenuCategoryTabsProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filteredProducts: Product[];
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  loading: boolean;
}

const MenuCategoryTabs = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  filteredProducts,
  onAddToCart,
  onViewDetails,
  loading
}: MenuCategoryTabsProps) => {
  // Get icon for category
  const getCategoryIcon = (category: string) => {
    switch(category?.toLowerCase()) {
      case 'xis': return <Sandwich className="h-4 w-4 mr-2" />;
      case 'porções': return <Utensils className="h-4 w-4 mr-2" />;
      case 'bebidas': return <CupSoda className="h-4 w-4 mr-2" />;
      default: return <Pizza className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <Tabs defaultValue="Todos" className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <TabsList className="w-full h-12 bg-gray-900 border border-gray-800 overflow-x-auto flex items-center scrollbar-hide">
          {categories.map((category) => (
            <TabsTrigger 
              key={category} 
              value={category}
              onClick={() => setSelectedCategory(category)}
              className="flex items-center px-4 py-2 data-[state=active]:bg-krecao-red data-[state=active]:text-white"
            >
              {getCategoryIcon(category)}
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {categories.map((category) => (
        <TabsContent key={category} value={category} className="mt-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-pulse flex space-x-2">
                <div className="h-3 w-3 bg-krecao-red rounded-full"></div>
                <div className="h-3 w-3 bg-krecao-yellow rounded-full"></div>
                <div className="h-3 w-3 bg-krecao-red rounded-full"></div>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">Nenhum produto encontrado</p>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default MenuCategoryTabs;
