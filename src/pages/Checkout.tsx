
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CartSummaryDetail from "@/components/checkout/CartSummaryDetail";
import { processWhatsAppOrder } from "@/utils/checkout";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, updateQuantity, removeFromCart, updateNotes, clearCart, getTotalPrice } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("dinheiro");
  const [loading, setLoading] = useState(false);

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
        variant: "destructive",
      });
      navigate("/menu");
      return;
    }
    
    setLoading(true);

    try {
      // Save user profile if logged in
      if (user) {
        await supabase
          .from("profiles")
          .update({
            name: customerName,
            phone: customerPhone,
            address: deliveryAddress,
          })
          .eq("id", user.id);
      }

      // Process order via WhatsApp
      processWhatsAppOrder({
        customerName,
        customerPhone,
        deliveryAddress,
        paymentMethod,
        cart,
        totalPrice: getTotalPrice()
      });
      
      // Clear cart
      clearCart();
      
      // Navigate back to menu
      navigate("/menu");
    } catch (error: any) {
      toast({
        title: "Erro ao processar pedido",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <Button
          variant="outline"
          onClick={() => navigate("/menu")}
          className="mb-8 mt-12 border-red text-red hover:bg-gray-800"
        >
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
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
