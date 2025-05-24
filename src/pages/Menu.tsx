
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";
import { fetchProducts, seedSpecificProducts, type Product } from "@/services/productService";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Percent } from "lucide-react";
import SearchBar from "@/components/menu/SearchBar";
import MenuCategoryTabs from "@/components/menu/MenuCategoryTabs";
import CartSummary from "@/components/menu/CartSummary";
import { ProductDetail } from "@/components/menu/ProductDetail";
import { Badge } from "@/components/ui/badge";

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const result = await fetchProducts();
      
      // Filter out "Adicionais" category
      const filteredProducts = result.products.filter(product => product.category !== "Adicionais");
      setProducts(filteredProducts);
      
      // Ensure categories are sorted with Bebidas at the end and exclude "Adicionais"
      const sortedCategories = ["Todos"]
        .concat(
          result.categories
            .filter(c => c !== "Todos" && c !== "Adicionais")
            .sort((a, b) => {
              // Place "Bebidas" at the end
              if (a === "Bebidas") return 1;
              if (b === "Bebidas") return -1;
              return a.localeCompare(b);
            })
        );
        
      setCategories(sortedCategories);
      
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
  const filteredProducts = products.filter(product => 
    (selectedCategory === "Todos" || product.category === selectedCategory) && 
    (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     product.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Produto adicionado",
      description: `${product.name} adicionado ao carrinho`
    });
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
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

  // Force a refresh of the products from the database to make sure we have the latest data
  const handleForceRefresh = () => {
    loadProducts();
    toast({
      title: "Menu atualizado",
      description: "Os produtos foram atualizados com sucesso"
    });
  };

  // Discount information
  const discountPercentage = user ? 13 : 10;

  return (
    <div className="min-h-screen bg-black text-white py-16">
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
            <span className="text-krecao-yellow"> Promocional</span>
          </h1>
          <p className="text-gray-400 mb-4 max-w-md mx-auto">
            Escolha seus lanches favoritos preparados com ingredientes frescos e de qualidade
          </p>
          
          {/* Adicionar frase com descontos */}
          <div className="flex justify-center items-center mb-6">
            <Badge variant="outline" className="bg-krecao-red/10 text-krecao-yellow border-krecao-red px-4 py-2">
              <Percent className="h-4 w-4 mr-2 text-krecao-yellow" />
              <span className="text-white">
                {user ? "Você tem " : ""}
                <span className="font-bold">{user ? "13%" : "10%"} OFF</span> no cardápio promocional
                {!user && " (Cadastre-se para 13% OFF + refrigerante mini grátis na primeira compra)"}
                {user && " + refrigerante mini grátis na primeira compra!"}
              </span>
            </Badge>
          </div>
          
          <SearchBar isSearchVisible={isSearchVisible} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setIsSearchVisible={setIsSearchVisible} />

          <MenuCategoryTabs 
            categories={categories} 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
            filteredProducts={filteredProducts} 
            onAddToCart={handleAddToCart} 
            onViewDetails={handleViewDetails}
            loading={loading} 
          />
        </div>
      </div>

      {cart.length > 0 && (
        <CartSummary 
          totalItems={getTotalItems()} 
          totalPrice={getTotalPrice()} 
          onCheckout={proceedToCheckout} 
        />
      )}

      <ProductDetail
        product={selectedProduct}
        isOpen={isProductDetailOpen}
        onClose={() => {
          setIsProductDetailOpen(false);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
};

export default Menu;
