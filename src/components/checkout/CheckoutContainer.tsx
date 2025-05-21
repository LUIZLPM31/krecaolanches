
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CartSummaryDetail from "@/components/checkout/CartSummaryDetail";
import { processPaymentAndOrder } from "@/utils/checkoutProcessor";

const CheckoutContainer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    updateNotes,
    clearCart,
    getTotalPrice
  } = useCart();
  
  // Form state
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("dinheiro");
  const [loading, setLoading] = useState(false);
  const [needChange, setNeedChange] = useState(false);
  const [changeAmount, setChangeAmount] = useState("");
  const [sodaFlavor, setSodaFlavor] = useState("");
  const [isFirstPurchase, setIsFirstPurchase] = useState(false);
  
  useEffect(() => {
    // Redirect to menu if cart is empty
    if (cart.length === 0) {
      navigate("/menu");
    }

    // Fetch user profile if logged in
    if (user) {
      fetchUserProfile();
    }
  }, [user, cart]);
  
  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setCustomerName(data.name || "");
        setCustomerPhone(data.phone || "");
        setDeliveryAddress(data.address || "");
        
        // Check if user has previous orders
        const { data: previousOrders, error: ordersError } = await supabase
          .from("orders")
          .select("id")
          .eq("user_id", user!.id)
          .limit(1);
        
        if (ordersError) throw ordersError;
        
        // User is eligible for free soda if they have no previous orders
        setIsFirstPurchase(previousOrders.length === 0);
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error.message);
    }
  };
  
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione produtos ao carrinho antes de finalizar o pedido",
        variant: "destructive"
      });
      navigate("/menu");
      return;
    }

    // Validate change amount when needed
    if (paymentMethod === "dinheiro" && needChange) {
      const changeValue = parseFloat(changeAmount.replace(",", "."));
      if (isNaN(changeValue) || changeValue <= 0) {
        toast({
          title: "Valor inválido",
          description: "Por favor, informe um valor válido para o troco",
          variant: "destructive"
        });
        return;
      }

      const totalPrice = getTotalPrice() * 0.87; // Apply 13% discount
      if (changeValue <= totalPrice) {
        toast({
          title: "Valor insuficiente",
          description: "O valor para troco deve ser maior que o total do pedido",
          variant: "destructive"
        });
        return;
      }
    }
    
    setLoading(true);
    try {
      await processPaymentAndOrder({
        user,
        supabase,
        customerName,
        customerPhone,
        deliveryAddress,
        paymentMethod,
        cart,
        needChange,
        changeAmount,
        getTotalPrice,
        sodaFlavor,
        isFirstPurchase,
        clearCart
      });

      // Navigate back to menu
      navigate("/menu");
    } catch (error: any) {
      toast({
        title: "Erro ao processar pedido",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <Button variant="outline" onClick={() => navigate("/menu")} className="mb-8 mt-12 border-red bg-krecao-red text-white">
          <ChevronLeft className="mr-2 h-4 w-4" /> Voltar 
        </Button>

        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Finalizar <span className="text-krecao-red">Pedido</span>
          </h1>
          <div className="w-20 h-1 bg-krecao-yellow mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CartSummaryDetail 
            cart={cart} 
            updateQuantity={updateQuantity} 
            removeFromCart={removeFromCart} 
            updateNotes={updateNotes} 
            getTotalPrice={getTotalPrice} 
          />
          
          <CheckoutForm 
            customerName={customerName}
            setCustomerName={setCustomerName}
            customerPhone={customerPhone}
            setCustomerPhone={setCustomerPhone}
            deliveryAddress={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            onSubmit={handleSubmitOrder}
            loading={loading}
            needChange={needChange}
            setNeedChange={setNeedChange}
            changeAmount={changeAmount}
            setChangeAmount={setChangeAmount}
            sodaFlavor={sodaFlavor}
            setSodaFlavor={setSodaFlavor}
            isFirstPurchase={isFirstPurchase}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutContainer;
