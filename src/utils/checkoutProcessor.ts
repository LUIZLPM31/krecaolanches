
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
    isLoggedIn: !!user,
    isFirstPurchase
  });

  // Save order to database if user is logged in
  if (user) {
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
  }

  // Clear cart
  clearCart();
};
