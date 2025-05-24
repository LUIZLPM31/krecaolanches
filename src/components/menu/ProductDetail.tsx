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
export function ProductDetail({
  product,
  isOpen,
  onClose
}: ProductDetailProps) {
  const {
    cart,
    addToCart,
    updateQuantity,
    updateNotes,
    addCustomization,
    removeCustomization
  } = useCart();
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
  const cartItem = cart.find(item => item.product.id === product.id);
  const handleAddToCart = () => {
    // Adicionar o produto ao carrinho se ainda não estiver lá
    if (!cartItem) {
      addToCart(product);
    }

    // Buscar o item novamente após a adição
    const updatedCartItem = cart.find(item => item.product.id === product.id) || cart[cart.length - 1]; // pegar o último item adicionado

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
  const handleAddCustomization = (customization: {
    type: 'adicionar' | 'remover';
    description: string;
    price: number;
  }) => {
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
  return <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      
    </Dialog>;
}