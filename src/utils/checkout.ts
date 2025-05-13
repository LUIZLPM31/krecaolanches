
import { CartItem } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";

interface OrderData {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  paymentMethod: string;
  cart: CartItem[];
  totalPrice: number;
  needChange?: boolean;
  changeAmount?: string;
}

const WHATSAPP_NUMBER = "5132422047";

// Calculate discount (15% off)
const applyDiscount = (price: number): number => {
  const discount = 0.15; // 15% discount
  return price * (1 - discount);
};

export const processWhatsAppOrder = (orderData: OrderData): void => {
  const { 
    customerName, 
    customerPhone, 
    deliveryAddress, 
    paymentMethod, 
    cart, 
    totalPrice,
    needChange,
    changeAmount 
  } = orderData;
  
  // Apply 15% discount
  const discountedTotal = applyDiscount(totalPrice);
  
  // Format cart items for WhatsApp
  const orderItems = cart.map(item => 
    `${item.quantity}x ${item.product.name} - R$${(item.product.price * item.quantity).toFixed(2)}${item.notes ? `\n   Obs: ${item.notes}` : ''}`
  ).join('\n');
  
  // Create WhatsApp message
  let message = `*Pedido *\n\n`;
  message += `*Cliente:* ${customerName}\n`;
  message += `*Telefone:* ${customerPhone}\n`;
  message += `*Endereço:* ${deliveryAddress}\n`;
  message += `*Forma de Pagamento:* ${paymentMethod === 'dinheiro' ? 'Dinheiro' : 'Cartão'}\n`;
  
  // Add change information if needed
  if (paymentMethod === 'dinheiro' && needChange && changeAmount) {
    message += `*Troco para:* R$${changeAmount}\n`;
  }
  
  message += `\n*Itens do pedido:*\n${orderItems}\n\n`;
  message += `*Subtotal:* R$${totalPrice.toFixed(2)}\n`;
  message += `*Desconto (15%):* R$${(totalPrice - discountedTotal).toFixed(2)}\n`;
  message += `*Total com desconto:* R$${discountedTotal.toFixed(2)}`;
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  // Notify user
  toast({
    title: "Desconto aplicado!",
    description: "Você ganhou 15% de desconto no seu pedido via WhatsApp!",
  });

  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
};
