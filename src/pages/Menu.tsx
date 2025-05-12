import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";
import { fetchProducts, seedSpecificProducts, type Product } from "@/services/productService";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SearchBar from "@/components/menu/SearchBar";
import MenuCategoryTabs from "@/components/menu/MenuCategoryTabs";
import CartSummary from "@/components/menu/CartSummary";

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
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const result = await fetchProducts();
      setProducts(result.products);
      setCategories(result.categories);
      if (result.error) {
        toast({
          title: "Erro ao carregar produtos",
          description: "Usando dados locais em vez de dados do banco",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error in loadProducts:", error);
      toast({
        title: "Erro ao carregar produtos",
        description: "Não foi possível carregar o menu",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter products by category and search query
  const filteredProducts = products.filter(product => (selectedCategory === "Todos" || product.category === selectedCategory) && (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase())));
  
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Produto adicionado",
      description: `${product.name} adicionado ao carrinho`
    });
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione produtos ao carrinho antes de continuar",
        variant: "destructive"
      });
      return;
    }
    navigate("/checkout");
  };

  // Load menu items if none exist
  useEffect(() => {
    if (products.length === 0 && !loading) {
      const seedProducts = async () => {
        const success = await seedSpecificProducts();
        if (success) {
          loadProducts(); // Refetch products
        }
      };
      seedProducts();
    }
  }, [products, loading]);

  // Fix for back button - go directly to home page instead of browser history
  const handleBackButton = () => {
    navigate("/");
  };

  return <div className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          onClick={handleBackButton} 
          className="mt-12 text-white hover:text-krecao-yellow flex items-center gap-1 bg-krecao-red"
        >
          <ArrowLeft size={16} />
          Voltar
        </Button>
        
        <div className="mb-8 text-center pt-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="text-krecao-yellow">Car</span>
            <span className="text-white">dá</span>
            <span className="text-krecao-red">pio</span>
          </h1>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Escolha seus lanches favoritos preparados com ingredientes frescos e de qualidade
          </p>
          
          <SearchBar isSearchVisible={isSearchVisible} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setIsSearchVisible={setIsSearchVisible} />

          <MenuCategoryTabs categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} filteredProducts={filteredProducts} onAddToCart={handleAddToCart} loading={loading} />
        </div>
      </div>

      {cart.length > 0 && <CartSummary totalItems={getTotalItems()} totalPrice={getTotalPrice()} onCheckout={proceedToCheckout} />}
    </div>;
};

export default Menu;
