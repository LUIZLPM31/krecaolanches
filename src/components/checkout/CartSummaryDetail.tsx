import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CartItem } from "@/hooks/useCart";
import { Plus, Minus, Trash } from "lucide-react";
interface CartSummaryDetailProps {
  cart: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateNotes: (productId: string, notes: string) => void;
  getTotalPrice: () => number;
}
const CartSummaryDetail = ({
  cart,
  updateQuantity,
  removeFromCart,
  updateNotes,
  getTotalPrice
}: CartSummaryDetailProps) => {
  return <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
      <h2 className="text-xl font-bold mb-4 flex items-center">Seu Carrinho</h2>

      <div className="space-y-4 mb-6">
        {cart.map(item => <div key={item.product.id} className="flex flex-col md:flex-row gap-4 border-b border-gray-800 pb-4">
            <div className="md:w-1/4">
              <img src={item.product.image_url} alt={item.product.name} className="w-full h-24 object-cover rounded" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-bold">{item.product.name}</h3>
                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product.id)} className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-transparent p-0">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                R$ {item.product.price.toFixed(2)}
              </p>
              <div className="flex items-center gap-2 mb-2">
                <Button variant="outline" size="icon" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="h-6 w-6 p-0 border-gray-700">
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button variant="outline" size="icon" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="h-6 w-6 p-0 border-gray-700">
                  <Plus className="h-3 w-3" />
                </Button>
                <span className="ml-auto font-bold">
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
              <Textarea placeholder="Observações (opcional)" value={item.notes} onChange={e => updateNotes(item.product.id, e.target.value)} className="h-20 text-sm bg-gray-800 border-gray-700" />
            </div>
          </div>)}
      </div>

      <div className="border-t border-gray-800 pt-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>R$ {getTotalPrice().toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Taxa de entrega:</span>
          <span>Consulte
        </span>
        </div>
        <div className="flex justify-between font-bold text-xl text-krecao-yellow mt-4">
          <span>Total:</span>
          <span>R$ {getTotalPrice().toFixed(2)}</span>
        </div>
      </div>
    </div>;
};
export default CartSummaryDetail;