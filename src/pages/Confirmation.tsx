
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock } from "lucide-react";

interface Order {
  id: string;
  status: string;
  total_price: number;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  payment_method: string;
  created_at: string;
}

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  notes: string;
  product: {
    name: string;
    description: string;
    image_url: string;
  };
}

const Confirmation = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orderId = localStorage.getItem("lastOrderId");
    
    if (!orderId) {
      navigate("/");
      return;
    }

    fetchOrderDetails(orderId);
  }, []);

  const fetchOrderDetails = async (orderId: string) => {
    try {
      // Fetch order details
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (orderError) throw orderError;

      // Fetch order items with product details
      const { data: itemsData, error: itemsError } = await supabase
        .from("order_items")
        .select(
          "*, product:product_id(name, description, image_url)"
        )
        .eq("order_id", orderId);

      if (itemsError) throw itemsError;

      setOrder(orderData);
      setOrderItems(itemsData as OrderItem[]);
    } catch (error: any) {
      console.error("Error fetching order details:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return {
          label: "Pedido Recebido",
          description: "Seu pedido foi recebido e está sendo preparado.",
          icon: <Clock className="h-12 w-12 text-krecao-yellow" />,
          color: "bg-yellow-500",
        };
      case "preparing":
        return {
          label: "Em Preparação",
          description: "Seu pedido está sendo preparado na cozinha.",
          icon: <Clock className="h-12 w-12 text-blue-500" />,
          color: "bg-blue-500",
        };
      case "delivering":
        return {
          label: "Em Entrega",
          description: "Seu pedido está a caminho da sua casa.",
          icon: <Clock className="h-12 w-12 text-purple-500" />,
          color: "bg-purple-500",
        };
      case "completed":
        return {
          label: "Entregue",
          description: "Seu pedido foi entregue. Bom apetite!",
          icon: <CheckCircle2 className="h-12 w-12 text-green-500" />,
          color: "bg-green-500",
        };
      default:
        return {
          label: "Pedido Recebido",
          description: "Seu pedido foi recebido e está sendo processado.",
          icon: <Clock className="h-12 w-12 text-krecao-yellow" />,
          color: "bg-yellow-500",
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Carregando detalhes do pedido...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Pedido não encontrado</h1>
        <Button onClick={() => navigate("/")} className="bg-krecao-red hover:bg-krecao-red/90">
          Voltar à Página Inicial
        </Button>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.status);

  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="mb-6 flex justify-center">
              {statusInfo.icon}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {statusInfo.label}
            </h1>
            <p className="text-gray-400">{statusInfo.description}</p>
            
            <div className="mt-6 p-4 bg-gray-900 rounded-lg inline-block">
              <p className="text-sm text-gray-400">Número do pedido</p>
              <p className="font-mono font-bold">{order.id.slice(0, 8).toUpperCase()}</p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden mb-8">
            <div className="bg-gray-800 p-4">
              <h2 className="font-bold text-lg">Detalhes do Pedido</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Data e Hora</h3>
                  <p>{formatDate(order.created_at)}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Forma de Pagamento</h3>
                  <p className="capitalize">{order.payment_method}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Cliente</h3>
                  <p>{order.customer_name}</p>
                  <p>{order.customer_phone}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Endereço de Entrega</h3>
                  <p>{order.delivery_address}</p>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-6">
                <h3 className="font-bold mb-4">Itens do Pedido</h3>
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-gray-800 pb-4">
                      <div className="w-16 h-16 shrink-0">
                        <img
                          src={item.product?.image_url || "/placeholder.svg"}
                          alt={item.product?.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{item.product?.name}</h4>
                            <p className="text-sm text-gray-400">
                              {item.quantity} x R$ {item.price.toFixed(2)}
                            </p>
                            {item.notes && (
                              <p className="text-sm text-gray-500 italic mt-1">
                                "{item.notes}"
                              </p>
                            )}
                          </div>
                          <p className="font-bold">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-800 pt-6">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>R$ {order.total_price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxa de entrega:</span>
                  <span>Grátis</span>
                </div>
                <div className="flex justify-between font-bold text-xl text-krecao-yellow mt-4">
                  <span>Total:</span>
                  <span>R$ {order.total_price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate("/")}
              className="bg-krecao-red hover:bg-krecao-red/90 px-8 py-6 text-lg"
            >
              Voltar à Página Inicial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
