
import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useOrderHistory } from "@/hooks/useOrderHistory";
import { CalendarIcon, PackageIcon, PackageCheck, Clock, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function OrderHistory() {
  const { orders, loading, fetchOrders, cancelOrder, canCancelOrder } = useOrderHistory();

  useEffect(() => {
    fetchOrders();
  }, []);

  // Função para formatar status
  const formatStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'Pendente', color: 'bg-yellow-500', icon: Clock };
      case 'processing':
        return { label: 'Em preparo', color: 'bg-blue-500', icon: PackageIcon };
      case 'delivering':
        return { label: 'Em entrega', color: 'bg-purple-500', icon: PackageIcon };
      case 'completed':
        return { label: 'Entregue', color: 'bg-green-500', icon: PackageCheck };
      case 'cancelled':
        return { label: 'Cancelado', color: 'bg-red-500', icon: X };
      default:
        return { label: 'Desconhecido', color: 'bg-gray-500', icon: PackageIcon };
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

  // Função para calcular tempo restante para cancelamento
  const getCancelTimeRemaining = (orderDate: string): string => {
    const orderTime = new Date(orderDate);
    const now = new Date();
    const timeDiff = now.getTime() - orderTime.getTime();
    const minutesPassed = Math.floor(timeDiff / (1000 * 60));
    const minutesRemaining = 15 - minutesPassed;
    
    if (minutesRemaining <= 0) return '';
    return `${minutesRemaining} min restantes para cancelar`;
  };

  const handleCancelOrder = async (orderId: string) => {
    await cancelOrder(orderId);
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
              const StatusIcon = status.icon;
              const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
              const canCancel = canCancelOrder(order);
              const timeRemaining = getCancelTimeRemaining(order.created_at);
              
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
                        {canCancel && timeRemaining && (
                          <div className="flex items-center text-xs text-yellow-400 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {timeRemaining}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${status.color} text-white flex items-center gap-1`}>
                          <StatusIcon className="h-3 w-3" />
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
                      
                      {canCancel && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full">
                              <X className="h-4 w-4 mr-2" />
                              Cancelar Pedido
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-gray-900 border-gray-700">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">
                                Cancelar Pedido
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-400">
                                Tem certeza que deseja cancelar este pedido? Esta ação não pode ser desfeita.
                                {timeRemaining && (
                                  <span className="block mt-2 text-yellow-400">
                                    Tempo restante para cancelamento: {timeRemaining}
                                  </span>
                                )}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-gray-800 text-white border-gray-700">
                                Manter Pedido
                              </AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleCancelOrder(order.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Sim, Cancelar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                      
                      {order.status === 'pending' && !canCancel && (
                        <div className="text-center text-sm text-gray-400 p-2 bg-gray-800 rounded">
                          <Clock className="h-4 w-4 inline mr-1" />
                          Tempo para cancelamento expirado (15 minutos)
                        </div>
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
