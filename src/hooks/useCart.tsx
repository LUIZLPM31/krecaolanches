import { createContext, useState, useContext, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

interface CustomizationItem {
  type: 'adicionar' | 'remover';
  description: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes: string;
  customizations: CustomizationItem[];
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateNotes: (productId: string, notes: string) => void;
  addCustomization: (productId: string, customization: CustomizationItem) => void;
  removeCustomization: (productId: string, index: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CART_STORAGE_KEY = 'krecao_cart';
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse cart from localStorage:", e);
          // Reset cart if there's an error
          localStorage.removeItem(CART_STORAGE_KEY);
        }
      }
      setIsInitialized(true);
    };
    
    loadCart();
  }, []);

  // Save cart to localStorage whenever it changes
  // But only after initial load to prevent overwriting with empty cart
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1, notes: "", customizations: [] }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === productId
      );

      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter((item) => item.product.id !== productId);
      }
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const updateNotes = (productId: string, notes: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, notes } : item
      )
    );
  };
  
  const addCustomization = (productId: string, customization: CustomizationItem) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, customizations: [...item.customizations, customization] }
          : item
      )
    );
  };
  
  const removeCustomization = (productId: string, index: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { 
              ...item, 
              customizations: item.customizations.filter((_, i) => i !== index) 
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  // Fix: Add safety check for item.customizations before calling reduce
  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => {
        const itemBasePrice = item.product.price * item.quantity;
        // Add safety check to ensure customizations exists and is an array before using reduce
        const customizationsPrice = Array.isArray(item.customizations) 
          ? item.customizations.reduce(
              (custTotal, cust) => custTotal + cust.price * item.quantity, 
              0
            )
          : 0;
        return total + itemBasePrice + customizationsPrice;
      },
      0
    );
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateNotes,
        addCustomization,
        removeCustomization,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
