
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";

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

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    checkIsAdmin();
  }, [user]);

  const checkIsAdmin = async () => {
    try {
      // Using JWT claims to check if user is admin
      const { data, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      const isUserAdmin = data?.session?.user?.app_metadata?.role === "admin";
      setIsAdmin(isUserAdmin);

      if (isUserAdmin) {
        fetchOrders();
      } else {
        toast({
          title: "Acesso negado",
          description: "Você não tem permissão para acessar esta página",
          variant: "destructive",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      navigate("/");
    }
  };

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setOrders(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar pedidos",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (order: Order) => {
    setSelectedOrder(order);

    try {
      const { data, error } = await supabase
        .from("order_items")
        .select("*, product:product_id(name, description, image_url)")
        .eq("order_id", order.id);

      if (error) throw error;

      setOrderItems(data as OrderItem[]);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar detalhes do pedido",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }

      toast({
        title: "Status atualizado",
        description: `Pedido atualizado para: ${newStatus}`,
      });
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar status",
        description: error.message,
        variant: "destructive",
      });
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "preparing":
        return "bg-blue-500";
      case "delivering":
        return "bg-purple-500";
      case "completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
        <p className="mb-6">Esta área é reservada para administradores.</p>
        <Button onClick={() => navigate("/")} className="bg-krecao-red hover:bg-krecao-red/90">
          Voltar à Página Inicial
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Painel <span className="text-krecao-red">Administrativo</span>
          </h1>
          <p className="text-gray-400">
            Gerencie os pedidos e atualize o status de entrega
          </p>
        </div>

        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Nº</TableHead>
                <TableHead className="text-white">Cliente</TableHead>
                <TableHead className="text-white">Data</TableHead>
                <TableHead className="text-white">Total</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Nenhum pedido encontrado
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono">
                      {order.id.slice(0, 8).toUpperCase()}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer_name}</p>
                        <p className="text-sm text-gray-400">
                          {order.customer_phone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(order.created_at)}</TableCell>
                    <TableCell className="font-bold">
                      R$ {order.total_price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(
                            order.status
                          )}`}
                        ></div>
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => fetchOrderDetails(order)}
                              className="border-gray-700 hover:bg-gray-800"
                            >
                              Detalhes
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="bg-gray-900 text-white border-gray-800">
                            {selectedOrder && (
                              <>
                                <SheetHeader className="mb-6">
                                  <SheetTitle className="text-white">
                                    Pedido #{selectedOrder.id.slice(0, 8).toUpperCase()}
                                  </SheetTitle>
                                </SheetHeader>

                                <div className="space-y-6">
                                  <div className="space-y-1">
                                    <h3 className="text-sm text-gray-400">
                                      Status atual
                                    </h3>
                                    <div className="flex items-center">
                                      <div
                                        className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(
                                          selectedOrder.status
                                        )}`}
                                      ></div>
                                      <span className="capitalize">
                                        {selectedOrder.status}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="space-y-3">
                                    <h3 className="text-sm text-gray-400">
                                      Atualizar Status
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                      <Button
                                        variant="outline"
                                        className={`${
                                          selectedOrder.status === "pending"
                                            ? "bg-yellow-500 text-black hover:bg-yellow-600"
                                            : "border-gray-700 hover:bg-gray-800"
                                        }`}
                                        onClick={() =>
                                          updateOrderStatus(selectedOrder.id, "pending")
                                        }
                                      >
                                        Recebido
                                      </Button>
                                      <Button
                                        variant="outline"
                                        className={`${
                                          selectedOrder.status === "preparing"
                                            ? "bg-blue-500 text-black hover:bg-blue-600"
                                            : "border-gray-700 hover:bg-gray-800"
                                        }`}
                                        onClick={() =>
                                          updateOrderStatus(
                                            selectedOrder.id,
                                            "preparing"
                                          )
                                        }
                                      >
                                        Preparando
                                      </Button>
                                      <Button
                                        variant="outline"
                                        className={`${
                                          selectedOrder.status === "delivering"
                                            ? "bg-purple-500 text-black hover:bg-purple-600"
                                            : "border-gray-700 hover:bg-gray-800"
                                        }`}
                                        onClick={() =>
                                          updateOrderStatus(
                                            selectedOrder.id,
                                            "delivering"
                                          )
                                        }
                                      >
                                        Em Entrega
                                      </Button>
                                      <Button
                                        variant="outline"
                                        className={`${
                                          selectedOrder.status === "completed"
                                            ? "bg-green-500 text-black hover:bg-green-600"
                                            : "border-gray-700 hover:bg-gray-800"
                                        }`}
                                        onClick={() =>
                                          updateOrderStatus(
                                            selectedOrder.id,
                                            "completed"
                                          )
                                        }
                                      >
                                        Entregue
                                      </Button>
                                    </div>
                                  </div>

                                  <div className="space-y-3">
                                    <h3 className="font-bold">
                                      Informações do Cliente
                                    </h3>
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                      <p className="font-medium">
                                        {selectedOrder.customer_name}
                                      </p>
                                      <p className="text-sm text-gray-400">
                                        {selectedOrder.customer_phone}
                                      </p>
                                      <p className="mt-2 text-sm">
                                        {selectedOrder.delivery_address}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="space-y-3">
                                    <h3 className="font-bold">Itens do Pedido</h3>
                                    <div className="space-y-4 max-h-80 overflow-y-auto">
                                      {orderItems.map((item) => (
                                        <div
                                          key={item.id}
                                          className="flex gap-3 bg-gray-800 p-3 rounded-lg"
                                        >
                                          <div className="w-16 h-16 shrink-0">
                                            <img
                                              src={
                                                item.product?.image_url ||
                                                "/placeholder.svg"
                                              }
                                              alt={item.product?.name}
                                              className="w-full h-full object-cover rounded"
                                            />
                                          </div>
                                          <div className="flex-1">
                                            <div className="flex justify-between">
                                              <p className="font-medium">
                                                {item.product?.name}
                                              </p>
                                              <p className="font-bold">
                                                {item.quantity}x
                                              </p>
                                            </div>
                                            <p className="text-sm text-gray-400">
                                              R$ {item.price.toFixed(2)}
                                            </p>
                                            {item.notes && (
                                              <p className="text-sm italic mt-1 text-gray-500">
                                                "{item.notes}"
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="border-t border-gray-800 pt-4">
                                    <div className="flex justify-between mb-2">
                                      <span>Forma de pagamento:</span>
                                      <span className="capitalize">
                                        {selectedOrder.payment_method}
                                      </span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                      <span>Subtotal:</span>
                                      <span>
                                        R$ {selectedOrder.total_price.toFixed(2)}
                                      </span>
                                    </div>
                                    <div className="flex justify-between font-bold text-xl text-krecao-yellow mt-4">
                                      <span>Total:</span>
                                      <span>
                                        R$ {selectedOrder.total_price.toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </SheetContent>
                        </Sheet>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
