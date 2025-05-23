
import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useOrderHistory } from "@/hooks/useOrderHistory";
import { CalendarIcon, PackageIcon, PackageCheck } from "lucide-react";

export function OrderHistory() {
  const { orders, loading, fetchOrders } = useOrderHistory();

  useEffect(() => {
    fetchOrders();
  }, []);

  // Função para formatar status
  const formatStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'Pendente', color: 'bg-yellow-500' };
      case 'processing':
        return { label: 'Em preparo', color: 'bg-blue-500' };
      case 'delivering':
        return { label: 'Em entrega', color: 'bg-purple-500' };
      case 'completed':
        return { label: 'Entregue', color: 'bg-green-500' };
      case 'cancelled':
        return { label: 'Cancelado', color: 'bg-red-500' };
      default:
        return { label: 'Desconhecido', color: 'bg-gray-500' };
    }
  };

  // Função para formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="bg-gray-900 border-gray-800 mt-8">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center gap-2">
          <PackageCheck className="h-5 w-5" />
          Histórico de Pedidos
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-krecao-yellow"></div>
          </div>
        ) : orders.length > 0 ? (
          <Accordion type="single" collapsible className="space-y-4">
            {orders.map((order) => {
              const status = formatStatus(order.status);
              const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
              
              return (
                <AccordionItem
                  key={order.id}
                  value={order.id}
                  className="bg-gray-800 rounded-lg border border-gray-700"
                >
                  <AccordionTrigger className="px-4 py-2 hover:bg-gray-700 rounded-t-lg">
                    <div className="flex flex-col md:flex-row md:justify-between w-full text-left items-start md:items-center gap-2">
                      <div className="flex flex-col">
                        <span className="font-medium text-white">
                          Pedido #{order.id.substring(0, 8)}
                        </span>
                        <div className="flex items-center text-sm text-gray-400">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {formatDate(order.created_at)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${status.color} text-white`}>
                          {status.label}
                        </Badge>
                        <span className="text-sm">
                          R$ {order.total_price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  
                  <AccordionContent className="p-4 pt-0">
                    <Separator className="my-4 bg-gray-700" />
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-white">Detalhes do Pedido</h4>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div>
                            <p className="text-sm text-gray-400">Método de pagamento</p>
                            <p className="text-white capitalize">{order.payment_method}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Itens</p>
                            <p className="text-white">{totalItems} {totalItems === 1 ? 'item' : 'itens'}</p>
                          </div>
                          {order.delivery_address && (
                            <div className="col-span-2">
                              <p className="text-sm text-gray-400">Endereço de entrega</p>
                              <p className="text-white">{order.delivery_address}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white">Itens do Pedido</h4>
                        <div className="mt-2 space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="bg-gray-900 p-3 rounded-lg">
                              <div className="flex justify-between">
                                <div className="flex-1">
                                  <p className="text-white font-medium">{item.product_name}</p>
                                  <p className="text-sm text-gray-400">
                                    {item.quantity}x R$ {(item.price / item.quantity).toFixed(2).replace('.', ',')}
                                  </p>
                                </div>
                                <p className="text-white">
                                  R$ {item.price.toFixed(2).replace('.', ',')}
                                </p>
                              </div>
                              
                              {item.notes && (
                                <p className="text-sm text-gray-400 mt-1">
                                  <span className="text-krecao-yellow">Observação:</span> {item.notes}
                                </p>
                              )}
                              
                              {item.customizations.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-sm text-gray-400 mb-1">Personalizações:</p>
                                  <ul className="space-y-1">
                                    {item.customizations.map((customization) => (
                                      <li key={customization.id} className="text-sm flex justify-between">
                                        <span className={customization.customization_type === 'adicionar' ? "text-green-400" : "text-red-400"}>
                                          {customization.customization_type === 'adicionar' ? '+ ' : '- '}
                                          {customization.item_description}
                                        </span>
                                        {customization.price_adjustment > 0 && (
                                          <span className="text-gray-400">
                                            R$ {customization.price_adjustment.toFixed(2).replace('.', ',')}
                                          </span>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between border-t border-gray-700 pt-3">
                        <span className="font-bold text-white">Total</span>
                        <span className="font-bold text-krecao-yellow">
                          R$ {order.total_price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                      
                      {order.status === 'pending' && (
                        <Button variant="destructive" className="w-full">
                          Cancelar Pedido
                        </Button>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : (
          <div className="text-center py-8">
            <PackageIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Nenhum pedido ainda</h3>
            <p className="text-gray-400 mb-4">
              Você ainda não fez nenhum pedido. Que tal experimentar algo delicioso?
            </p>
            <Button 
              className="bg-krecao-red hover:bg-krecao-red/90"
              onClick={() => window.location.href = '/menu'}
            >
              Explorar cardápio
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
