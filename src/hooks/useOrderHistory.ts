
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
  notes: string | null;
  customizations: {
    id: string;
    customization_type: string;
    item_description: string;
    price_adjustment: number;
  }[];
}

export interface Order {
  id: string;
  created_at: string;
  status: string;
  total_price: number;
  payment_method: string;
  delivery_address: string | null;
  items: OrderItem[];
}

export const useOrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchOrders = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Buscar pedidos do usuário
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      const ordersWithItems: Order[] = [];

      // Para cada pedido, buscar os itens
      for (const order of ordersData) {
        const { data: itemsData, error: itemsError } = await supabase
          .from('order_items')
          .select(`
            id,
            quantity,
            price,
            notes,
            products(name)
          `)
          .eq('order_id', order.id);

        if (itemsError) throw itemsError;

        const itemsWithCustomizations = [];

        // Para cada item, buscar as personalizações
        for (const item of itemsData) {
          const { data: customizationsData, error: customizationsError } = await supabase
            .from('order_customizations')
            .select('*')
            .eq('order_item_id', item.id);

          if (customizationsError) throw customizationsError;

          itemsWithCustomizations.push({
            id: item.id,
            product_name: item.products?.name || 'Produto não disponível',
            quantity: item.quantity,
            price: item.price,
            notes: item.notes,
            customizations: customizationsData || []
          });
        }

        ordersWithItems.push({
          ...order,
          items: itemsWithCustomizations
        });
      }

      setOrders(ordersWithItems);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Falha ao carregar histórico de pedidos: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'cancelled' })
        .eq('id', orderId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Atualizar o estado local
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, status: 'cancelled' }
            : order
        )
      );

      toast({
        title: "Pedido cancelado",
        description: "Seu pedido foi cancelado com sucesso",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Falha ao cancelar pedido: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  // Verificar se um pedido pode ser cancelado
  const canCancelOrder = (order: Order): boolean => {
    const orderDate = new Date(order.created_at);
    const now = new Date();
    const timeDiff = now.getTime() - orderDate.getTime();
    const minutesDiff = timeDiff / (1000 * 60);
    
    // Pode cancelar se estiver pendente e foi feito há menos de 15 minutos
    return order.status === 'pending' && minutesDiff <= 15;
  };

  // Buscar pedidos quando o componente for montado
  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return {
    orders,
    loading,
    fetchOrders,
    cancelOrder,
    canCancelOrder
  };
};
