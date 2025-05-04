
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingCart, ChevronLeft, Plus, Minus, Trash } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, updateQuantity, removeFromCart, updateNotes, clearCart, getTotalPrice } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("dinheiro");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);

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
        setProfile(data);
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

      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: user?.id || null,
            status: "pending",
            total_price: getTotalPrice(),
            customer_name: customerName,
            customer_phone: customerPhone,
            delivery_address: deliveryAddress,
            payment_method: paymentMethod,
          },
        ])
        .select("id")
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cart.map((item) => ({
        order_id: orderData.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
        notes: item.notes,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Save order ID to localStorage for confirmation page
      localStorage.setItem("lastOrderId", orderData.id);
      
      // Clear cart
      clearCart();
      
      toast({
        title: "Pedido realizado com sucesso!",
        description: "Seu pedido foi enviado e será processado em breve.",
      });

      // Navigate to confirmation page
      navigate("/confirmation");
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

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleUpdateNotes = (productId: string, notes: string) => {
    updateNotes(productId, notes);
  };

  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <Button
          variant="outline"
          onClick={() => navigate("/menu")}
          className="mb-8 mt-12 border-gray-700 text-white hover:bg-gray-800"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Voltar ao Cardápio
        </Button>

        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Finalizar <span className="text-krecao-red">Pedido</span>
          </h1>
          <div className="w-20 h-1 bg-krecao-yellow mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5 text-krecao-yellow" />
              Seu Carrinho
            </h2>

            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex flex-col md:flex-row gap-4 border-b border-gray-800 pb-4"
                >
                  <div className="md:w-1/4">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{item.product.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-transparent p-0"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      R$ {item.product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleUpdateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="h-6 w-6 p-0 border-gray-700"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleUpdateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="h-6 w-6 p-0 border-gray-700"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <span className="ml-auto font-bold">
                        R$ {(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    <Textarea
                      placeholder="Observações (opcional)"
                      value={item.notes}
                      onChange={(e) =>
                        handleUpdateNotes(item.product.id, e.target.value)
                      }
                      className="h-20 text-sm bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-800 pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>R$ {getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxa de entrega:</span>
                <span>Grátis</span>
              </div>
              <div className="flex justify-between font-bold text-xl text-krecao-yellow mt-4">
                <span>Total:</span>
                <span>R$ {getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-bold mb-6">Informações de Entrega</h2>

            <form onSubmit={handleSubmitOrder}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereço completo</Label>
                  <Textarea
                    id="address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                    placeholder="Rua, número, complemento, bairro, cidade"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Forma de pagamento</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`border rounded-lg p-4 cursor-pointer ${
                        paymentMethod === "dinheiro"
                          ? "border-krecao-yellow bg-gray-800"
                          : "border-gray-700"
                      }`}
                      onClick={() => setPaymentMethod("dinheiro")}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold">Dinheiro</span>
                        {paymentMethod === "dinheiro" && (
                          <div className="h-3 w-3 bg-krecao-yellow rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        Pague em dinheiro na entrega
                      </p>
                    </div>
                    <div
                      className={`border rounded-lg p-4 cursor-pointer ${
                        paymentMethod === "cartao"
                          ? "border-krecao-yellow bg-gray-800"
                          : "border-gray-700"
                      }`}
                      onClick={() => setPaymentMethod("cartao")}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold">Cartão</span>
                        {paymentMethod === "cartao" && (
                          <div className="h-3 w-3 bg-krecao-yellow rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        Pague com cartão na entrega
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full mt-8 bg-krecao-red hover:bg-krecao-red/90 py-6 text-lg font-bold"
                  disabled={loading}
                >
                  {loading ? "Processando..." : "Confirmar Pedido"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
