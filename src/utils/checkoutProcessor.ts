
import { User } from "@supabase/supabase-js";
import { CartItem } from "@/hooks/useCart";
import { processWhatsAppOrder } from "@/utils/checkout";
import { SupabaseClient } from "@supabase/supabase-js";

interface ProcessPaymentAndOrderParams {
  user: User | null;
  supabase: SupabaseClient;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  paymentMethod: string;
  cart: CartItem[];
  needChange?: boolean;
  changeAmount: string;
  sodaFlavor: string;
  isFirstPurchase: boolean;
  cardType?: string;
  getTotalPrice: () => number;
  clearCart: () => void;
}

export const processPaymentAndOrder = async ({
  user,
  supabase,
  customerName,
  customerPhone,
  deliveryAddress,
  paymentMethod,
  cart,
  needChange,
  changeAmount,
  getTotalPrice,
  sodaFlavor,
  isFirstPurchase,
  cardType,
  clearCart
}: ProcessPaymentAndOrderParams) => {
  // Save user profile if logged in
  if (user) {
    await supabase.from("profiles").update({
      name: customerName,
      phone: customerPhone,
      address: deliveryAddress
    }).eq("id", user.id);
  }

  // Process order via WhatsApp
  processWhatsAppOrder({
    customerName,
    customerPhone,
    deliveryAddress,
    paymentMethod,
    cart,
    totalPrice: getTotalPrice(),
    needChange: needChange && paymentMethod === "dinheiro",
    changeAmount: needChange ? changeAmount : "",
    sodaFlavor: user && isFirstPurchase ? sodaFlavor : undefined,
    cardType: paymentMethod === "cartao" ? cardType : undefined,
    isLoggedIn: !!user,
    isFirstPurchase
  });

  if (user) {
    try {
      // Criar o pedido
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: user.id,
            customer_name: customerName,
            customer_phone: customerPhone,
            delivery_address: deliveryAddress,
            payment_method: paymentMethod,
            total_price: getTotalPrice() * 0.87, // Apply 13% discount
            status: "pending"
          }
        ])
        .select();
        
      if (orderError) throw orderError;
      
      if (orderData && orderData.length > 0) {
        const orderId = orderData[0].id;
        
        // Criar os itens do pedido
        for (const item of cart) {
          const { data: itemData, error: itemError } = await supabase
            .from("order_items")
            .insert([
              {
                order_id: orderId,
                product_id: item.product.id,
                quantity: item.quantity,
                price: item.product.price * item.quantity,
                notes: item.notes || null
              }
            ])
            .select();
            
          if (itemError) throw itemError;
          
          if (itemData && itemData.length > 0 && item.customizations.length > 0) {
            const orderItemId = itemData[0].id;
            
            // Criar as personalizações para este item
            const customizationsToInsert = item.customizations.map(customization => ({
              order_item_id: orderItemId,
              customization_type: customization.type,
              item_description: customization.description,
              price_adjustment: customization.price
            }));
            
            const { error: customizationError } = await supabase
              .from("order_customizations")
              .insert(customizationsToInsert);
              
            if (customizationError) throw customizationError;
          }
        }
        
        // Se for o primeiro pedido, atualizar o perfil
        if (isFirstPurchase) {
          await supabase
            .from("profiles")
            .update({ first_order_completed: true })
            .eq("id", user.id);
        }
      }
    } catch (error) {
      console.error("Erro ao salvar pedido no banco de dados:", error);
      // Não vamos interromper o fluxo, já que o pedido já foi enviado via WhatsApp
    }
  }

  // Clear cart
  clearCart();
};
