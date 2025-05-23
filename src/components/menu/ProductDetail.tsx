
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { ProductReviewSection } from "../reviews/ProductReviewSection";
import { ProductCustomization } from "./ProductCustomization";
import { useCart, CartItem } from "@/hooks/useCart";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetail({ product, isOpen, onClose }: ProductDetailProps) {
  const { cart, addToCart, updateQuantity, updateNotes, addCustomization, removeCustomization } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("details");

  // Reset state when product changes
  useState(() => {
    if (isOpen) {
      setQuantity(1);
      setNotes("");
      setActiveTab("details");
    }
  });

  if (!product) return null;

  // Encontrar o item do carrinho correspondente a este produto
  const cartItem = cart.find((item) => item.product.id === product.id);

  const handleAddToCart = () => {
    // Adicionar o produto ao carrinho se ainda não estiver lá
    if (!cartItem) {
      addToCart(product);
    }
    
    // Buscar o item novamente após a adição
    const updatedCartItem = cart.find((item) => item.product.id === product.id) || 
      cart[cart.length - 1];  // pegar o último item adicionado
    
    // Atualizar a quantidade e observações
    if (updatedCartItem) {
      updateQuantity(updatedCartItem.product.id, quantity);
      if (notes.trim()) {
        updateNotes(updatedCartItem.product.id, notes);
      }
    }
    
    onClose();
    setQuantity(1);
    setNotes("");
  };

  const handleAddCustomization = (customization: { type: 'adicionar' | 'remover', description: string, price: number }) => {
    // Adicionar o produto ao carrinho se ainda não estiver lá
    if (!cartItem) {
      addToCart(product);
      // Esperamos um ciclo para o item aparecer no carrinho
      setTimeout(() => {
        const newCartItem = cart.find(item => item.product.id === product.id);
        if (newCartItem) {
          addCustomization(newCartItem.product.id, customization);
        }
      }, 0);
    } else {
      addCustomization(cartItem.product.id, customization);
    }
  };

  const handleRemoveCustomization = (index: number) => {
    if (cartItem) {
      removeCustomization(cartItem.product.id, index);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="flex p-2 mb-4 bg-gray-800 rounded-lg">
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md ${
              activeTab === "details"
                ? "bg-krecao-red text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Detalhes
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md ${
              activeTab === "reviews"
                ? "bg-krecao-red text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Avaliações
          </button>
        </div>

        {activeTab === "details" ? (
          <div className="grid gap-4">
            <div className="relative aspect-video">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-[200px] object-cover rounded-lg"
              />
              <div className="absolute top-2 left-2 bg-krecao-red px-2 py-1 text-xs font-bold rounded-md">
                {product.category}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg text-white">{product.name}</h3>
              <p className="text-gray-400">{product.description}</p>
              <p className="text-krecao-yellow font-bold mt-2">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label htmlFor="notes" className="block text-white mb-2">
                  Observações
                </label>
                <Textarea
                  id="notes"
                  placeholder="Ex: Sem cebola, ponto médio, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-gray-800 text-white"
                />
              </div>

              {cartItem && (
                <ProductCustomization
                  item={cartItem}
                  onAddCustomization={handleAddCustomization}
                  onRemoveCustomization={handleRemoveCustomization}
                />
              )}

              <div>
                <label className="block text-white mb-2">
                  Quantidade
                </label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 rounded-r-none border-gray-700"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="h-10 px-3 flex items-center justify-center border-y border-gray-700 bg-gray-800">
                    {quantity}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 rounded-l-none border-gray-700"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="bg-krecao-red hover:bg-krecao-red/90 mt-2"
            >
              {cartItem ? "Atualizar no carrinho" : "Adicionar ao carrinho"} - R${" "}
              {(product.price * quantity).toFixed(2).replace(".", ",")}
            </Button>
          </div>
        ) : (
          <div>
            <ProductReviewSection productId={product.id} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
