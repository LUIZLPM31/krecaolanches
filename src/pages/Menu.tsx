
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Plus, Pizza, Sandwich, Utensils, Filter, Search } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

const Menu = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, addToCart, getTotalPrice, getTotalItems } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*");
      
      if (error) throw error;
      
      if (data) {
        setProducts(data);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.map((product) => product.category))
        ).filter(Boolean);
        
        setCategories(["Todos", ...uniqueCategories]);
      }
    } catch (error: any) {
      toast({
        title: "Erro ao carregar produtos",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    
    toast({
      title: "Produto adicionado",
      description: `${product.name} adicionado ao carrinho`,
    });
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione produtos ao carrinho antes de continuar",
        variant: "destructive",
      });
      return;
    }

    navigate("/checkout");
  };

  // Filter products by category and search query
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "Todos" || product.category === selectedCategory) &&
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get icon for category
  const getCategoryIcon = (category: string) => {
    switch(category?.toLowerCase()) {
      case 'xis': return <Sandwich className="h-4 w-4 mr-2" />;
      case 'porções': return <Utensils className="h-4 w-4 mr-2" />;
      default: return <Pizza className="h-4 w-4 mr-2" />;
    }
  };

  // Load menu items from MenuHighlights to seed products if none exist
  useEffect(() => {
    if (products.length === 0 && !loading) {
      const seedProducts = async () => {
        const menuItems = [
          {
            name: "Xis Salada",
            description: "Hambúrguer artesanal, queijo cheddar, bacon crocante, alface e tomate. Acompanha maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
            price: "29.90",
            image_url: "/lovable-uploads/d936da9b-59e0-4c24-9293-8e6340fe127a.png",
            category: "Xis"
          },
          {
            name: "Xis Calabresa",
            description: "Dois hambúrgueres artesanais, queijo duplo, calabresa e molho especial. Acompanha maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
            price: "34.90",
            image_url: "/lovable-uploads/e8979a79-1dfc-4ed6-ae36-59940dc39802.png",
            category: "Xis"
          },
          {
            name: "Xis Frango",
            description: "Filé de frango grelhado, queijo, bacon, cebola caramelizada e molho da casa. Acompanha maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
            price: "32.90",
            image_url: "/lovable-uploads/237a70a4-42a7-450d-8a50-41b539516fea.png",
            category: "Xis"
          },
          {
            name: "Batata Frita K-recão",
            description: "Porção de batata frita crocante com queijo cheddar e bacon.",
            price: "19.90",
            image_url: "https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
            category: "Porções"
          },
        ];

        try {
          for (const item of menuItems) {
            const { error } = await supabase.from("products").insert([
              {
                name: item.name,
                description: item.description,
                price: parseFloat(item.price),
                image_url: item.image_url,
                category: item.category
              }
            ]);
            
            if (error) throw error;
          }
          
          // Refetch products
          fetchProducts();
        } catch (error: any) {
          console.error("Failed to seed products:", error);
        }
      };
      
      seedProducts();
    }
  }, [products, loading]);

  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center pt-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="text-krecao-yellow">Car</span>
            <span className="text-white">dá</span>
            <span className="text-krecao-red">pio</span>
          </h1>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Escolha seus lanches favoritos preparados com ingredientes frescos e de qualidade
          </p>
          
          <div className="flex justify-center mb-6">
            {isSearchVisible ? (
              <div className="relative w-full max-w-md">
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800 border-gray-700 pl-10 pr-4"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => setIsSearchVisible(false)}
                >
                  ✕
                </button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => setIsSearchVisible(true)}
              >
                <Search className="mr-2 h-4 w-4" /> Buscar
              </Button>
            )}
          </div>

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
                      <Card
                        key={product.id}
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
                                  R$ {product.price.toFixed(2)}
                                </span>
                              </div>
                              <p className="text-gray-400 mb-4">{product.description}</p>
                            </div>
                            <Button
                              onClick={() => handleAddToCart(product)}
                              className="bg-krecao-red hover:bg-krecao-red/90 group-hover:bg-krecao-yellow group-hover:text-black transition-colors"
                            >
                              <Plus className="mr-2 h-4 w-4" /> Adicionar ao Carrinho
                            </Button>
                          </div>
                        </div>
                      </Card>
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
        </div>
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 animate-fade-in">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5 text-krecao-yellow" />
                <div>
                  <span className="text-sm md:text-base">
                    {getTotalItems()}{" "}
                    {getTotalItems() === 1 ? "item" : "itens"}{" "}
                    no carrinho
                  </span>
                  <p className="text-krecao-yellow font-bold">
                    Total: R$ {getTotalPrice().toFixed(2)}
                  </p>
                </div>
              </div>
              <Button
                onClick={proceedToCheckout}
                className="bg-krecao-yellow text-black hover:bg-krecao-yellow/90 w-full md:w-auto"
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Finalizar Pedido
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
