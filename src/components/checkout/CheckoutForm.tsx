
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/hooks/useAuth";
import { ShoppingCart } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CheckoutFormProps {
  customerName: string;
  setCustomerName: (name: string) => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  needChange: boolean;
  setNeedChange: (needChange: boolean) => void;
  changeAmount: string;
  setChangeAmount: (amount: string) => void;
  sodaFlavor?: string;
  setSodaFlavor?: (flavor: string) => void;
  isFirstPurchase?: boolean;
}

const CheckoutForm = ({
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  deliveryAddress,
  setDeliveryAddress,
  paymentMethod,
  setPaymentMethod,
  onSubmit,
  loading,
  needChange,
  setNeedChange,
  changeAmount,
  setChangeAmount,
  sodaFlavor,
  setSodaFlavor,
  isFirstPurchase = false
}: CheckoutFormProps) => {
  const { user } = useAuth();
  
  // Soda flavor options
  const sodaOptions = [
    "Coca-Cola",
    "Guaraná",
    "Sprite",
    "Fanta Laranja",
    "Fanta Uva",
    "Pepsi",
    "Outro (especificar nos detalhes do pedido)"
  ];

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <h2 className="text-xl font-semibold text-white mb-6">Detalhes da Entrega</h2>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo</Label>
          <Input
            id="name"
            placeholder="Seu nome completo"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            className="bg-gray-800 border-gray-700"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            placeholder="Ex: (51) 99999-9999"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            required
            className="bg-gray-800 border-gray-700"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Endereço de Entrega</Label>
          <Textarea
            id="address"
            placeholder="Rua, número, bairro, complemento"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            required
            className="bg-gray-800 border-gray-700"
          />
        </div>
        
        {/* Mini soda flavor selection for registered users on first purchase */}
        {user && isFirstPurchase && setSodaFlavor && (
          <div className="space-y-2">
            <Label htmlFor="soda-flavor">Sabor do Mini Refrigerante (Grátis na primeira compra)</Label>
            <Select value={sodaFlavor} onValueChange={setSodaFlavor}>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Escolha o sabor do refrigerante" />
              </SelectTrigger>
              <SelectContent>
                {sodaOptions.map((flavor) => (
                  <SelectItem key={flavor} value={flavor}>
                    {flavor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-400">Benefício exclusivo para clientes cadastrados na primeira compra!</p>
          </div>
        )}
        
        <div className="space-y-3">
          <Label>Forma de Pagamento</Label>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dinheiro" id="dinheiro" />
              <Label htmlFor="dinheiro" className={`cursor-pointer ${paymentMethod === 'dinheiro' ? 'text-krecao-yellow font-bold' : ''}`}>
                Dinheiro
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cartao" id="cartao" />
              <Label htmlFor="cartao" className={`cursor-pointer ${paymentMethod === 'cartao' ? 'text-krecao-yellow font-bold' : ''}`}>
                Cartão (na entrega)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pix" id="pix" />
              <Label htmlFor="pix" className={`cursor-pointer ${paymentMethod === 'pix' ? 'text-krecao-yellow font-bold' : ''}`}>
                PIX (enviaremos os dados)
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Change section */}
        {paymentMethod === 'dinheiro' && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="need-change"
                checked={needChange}
                onChange={(e) => setNeedChange(e.target.checked)}
                className="rounded border-gray-700"
              />
              <Label htmlFor="need-change" className="cursor-pointer">Preciso de troco</Label>
            </div>
            
            {needChange && (
              <div className="space-y-2">
                <Label htmlFor="change-amount">Troco para quanto?</Label>
                <Input
                  id="change-amount"
                  type="text"
                  placeholder="Ex: 50,00"
                  value={changeAmount}
                  onChange={(e) => setChangeAmount(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            )}
          </div>
        )}
        
        <Button type="submit" disabled={loading} className="w-full bg-krecao-yellow hover:bg-krecao-yellow/90 text-black mt-4">
          <ShoppingCart className="mr-2 h-4 w-4" />
          {loading ? "Processando..." : "Finalizar Pedido"}
        </Button>
        
        <p className="text-sm text-gray-400 text-center mt-2">
          Seu pedido será enviado para o WhatsApp do K-recão Lanches
        </p>
      </form>
    </div>
  );
};

export default CheckoutForm;
