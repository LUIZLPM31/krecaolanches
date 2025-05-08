
import { CartItem } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";

interface OrderData {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  paymentMethod: string;
  cart: CartItem[];
  totalPrice: number;
}

const WHATSAPP_NUMBER = "5132422047";

export const processWhatsAppOrder = (orderData: OrderData): void => {
  const { customerName, customerPhone, deliveryAddress, paymentMethod, cart, totalPrice } = orderData;
  
  // Format cart items for WhatsApp
  const orderItems = cart.map(item => 
    `${item.quantity}x ${item.product.name} - R$${(item.product.price * item.quantity).toFixed(2)}${item.notes ? `\n   Obs: ${item.notes}` : ''}`
  ).join('\n');
  
  // Create WhatsApp message
  let message = `*Pedido K-recão Lanches*\n\n`;
  message += `*Cliente:* ${customerName}\n`;
  message += `*Telefone:* ${customerPhone}\n`;
  message += `*Endereço:* ${deliveryAddress}\n`;
  message += `*Forma de Pagamento:* ${paymentMethod === 'dinheiro' ? 'Dinheiro' : 'Cartão'}\n\n`;
  message += `*Itens do pedido:*\n${orderItems}\n\n`;
  message += `*Total:* R$${totalPrice.toFixed(2)}`;
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  // Notify user
  toast({
    title: "Redirecionando para WhatsApp",
    description: "Você será redirecionado para finalizar seu pedido pelo WhatsApp",
  });

  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
};
