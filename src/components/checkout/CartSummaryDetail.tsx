import React from "react";
import { CartItem } from "@/hooks/useCart";
import { Card } from "@/components/ui/card";
import { Trash2, Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductCustomization } from "@/components/menu/ProductCustomization";
interface CartSummaryDetailProps {
  cart: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateNotes: (productId: string, notes: string) => void;
  getTotalPrice: () => number;
}
const CartSummaryDetail: React.FC<CartSummaryDetailProps> = ({
  cart,
  updateQuantity,
  removeFromCart,
  updateNotes,
  getTotalPrice
}) => {
  // Calculate item price including customizations
  const calculateItemPrice = (item: CartItem) => {
    const basePrice = item.product.price * item.quantity;
    // Add safety check to ensure customizations exists and is an array before using reduce
    const customizationsPrice = Array.isArray(item.customizations) ? item.customizations.reduce((total, cust) => total + cust.price * item.quantity, 0) : 0;
    return basePrice + customizationsPrice;
  };
  return <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Seu Pedido</h2>

      {cart.length === 0 ? <Card className="p-6 text-center bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-700">
          <p className="text-gray-400 dark:text-gray-400">Seu carrinho está vazio</p>
        </Card> : <div className="space-y-4">
          {cart.map(item => <Card key={item.product.id} className="bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 relative rounded-md overflow-hidden">
                    <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-lg">{item.product.name}</h3>
                      <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 hover:text-red-400">
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <p className="text-gray-400 text-sm mb-2">
                      {item.product.price.toFixed(2).replace(".", ",")} / unidade
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <Button variant="outline" size="icon" className="h-7 w-7 p-0 border-gray-600 dark:border-gray-600" onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}>
                        <Minus size={14} />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7 p-0 border-gray-600 dark:border-gray-600" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                        <Plus size={14} />
                      </Button>
                      <span className="ml-auto font-medium">
                        R$ {calculateItemPrice(item).toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Exibir personalizações */}
                {Array.isArray(item.customizations) && item.customizations.length > 0 && <div className="mt-3 pl-24 space-y-1">
                    <p className="text-sm text-gray-400">Personalizações:</p>
                    {item.customizations.map((customization, index) => <div key={index} className="flex justify-between text-sm">
                        <span className={customization.type === 'adicionar' ? "text-green-400" : "text-red-400"}>
                          {customization.type === 'adicionar' ? '+ ' : '- '}
                          {customization.description}
                        </span>
                        {customization.price > 0 && <span>
                            +R$ {(customization.price * item.quantity).toFixed(2).replace('.', ',')}
                          </span>}
                      </div>)}
                  </div>}

                {/* Observações do item */}
                <div className="mt-4">
                  <Label htmlFor={`notes-${item.product.id}`} className="text-sm text-gray-300 dark:text-gray-300">
                    Observações
                  </Label>
                  <Textarea id={`notes-${item.product.id}`} placeholder="Ex: Sem cebola, mal passado, etc." value={item.notes} onChange={e => updateNotes(item.product.id, e.target.value)} className="mt-1 bg-gray-700 border-gray-600 dark:bg-gray-700 dark:border-gray-600" />
                </div>
              </div>
            </Card>)}

          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>R$ {getTotalPrice().toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="flex justify-between py-2 text-gray-400 dark:text-gray-400">
              <span>Taxa de entrega</span>
              <span>Consultar taxa</span>
            </div>
            <div className="flex justify-between py-2 text-krecao-yellow">
              <span>Desconto promocional (13%)</span>
              <span>-R$ {(getTotalPrice() * 0.13).toFixed(2).replace(".", ",")}</span>
            </div>
            <Separator className="my-2 bg-gray-700 dark:bg-gray-700" />
            <div className="flex justify-between py-2 font-bold text-lg">
              <span>Total</span>
              <span>
                R$ {(getTotalPrice() * 0.87).toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
        </div>}
    </div>;
};
export default CartSummaryDetail;