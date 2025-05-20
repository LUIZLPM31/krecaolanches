
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
  sodaFlavor?: string;
  isLoggedIn?: boolean;
  isFirstPurchase?: boolean;
}

const WHATSAPP_NUMBER = "5132422047";

// Calculate discount based on login status
const applyDiscount = (price: number, isLoggedIn: boolean = false): number => {
  const discount = isLoggedIn ? 0.13 : 0.10; // 13% for registered users, 10% for guests
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
    changeAmount,
    sodaFlavor,
    isLoggedIn = false,
    isFirstPurchase = false
  } = orderData;
  
  // Apply discount based on login status
  const discountedTotal = applyDiscount(totalPrice, isLoggedIn);
  const discountPercentage = isLoggedIn ? '13%' : '10%';
  
  // Format cart items for WhatsApp
  const orderItems = cart.map(item => 
    `${item.quantity}x ${item.product.name} - R$${(item.product.price * item.quantity).toFixed(2)}${item.notes ? `\n   Obs: ${item.notes}` : ''}`
  ).join('\n');
  
  // Create WhatsApp message
  let message = `*Pedido *\n\n`;
  message += `*Cliente:* ${customerName}\n`;
  message += `*Telefone:* ${customerPhone}\n`;
  message += `*Endereço:* ${deliveryAddress}\n`;
  message += `*Forma de Pagamento:* ${paymentMethod === 'dinheiro' ? 'Dinheiro' : (paymentMethod === 'cartao' ? 'Cartão' : 'PIX')}\n`;
  
  // Add change information if needed
  if (paymentMethod === 'dinheiro' && needChange && changeAmount) {
    message += `*Troco para:* R$${changeAmount}\n`;
  }
  
  message += `\n*Itens do pedido:*\n${orderItems}\n\n`;
  message += `*Total:* R$${discountedTotal.toFixed(2)}`;
  
  // Add soda flavor information if specified by a registered user on first purchase
  // Include the mini refrigerante in the order message if user selected one
  if (isLoggedIn && isFirstPurchase && sodaFlavor) {
    message += `\n\n*Mini Refrigerante (Grátis na primeira compra):* ${sodaFlavor}`;
  }
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  // Notify user
  toast({
    title: "Pedido Enviado!",
    description: "Seu pedido está sendo enviado via WhatsApp",
  });

  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
};
