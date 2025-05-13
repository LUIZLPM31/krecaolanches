
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CheckoutFormProps {
  customerName: string;
  setCustomerName: (value: string) => void;
  customerPhone: string;
  setCustomerPhone: (value: string) => void;
  deliveryAddress: string;
  setDeliveryAddress: (value: string) => void;
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  needChange: boolean;
  setNeedChange: (value: boolean) => void;
  changeAmount: string;
  setChangeAmount: (value: string) => void;
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
}: CheckoutFormProps) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
      <h2 className="text-xl font-bold mb-6">Informações de Entrega</h2>
      
      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
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
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              required
              className="bg-gray-800 border-gray-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Endereço completo</Label>
            <Textarea
              id="address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              required
              placeholder="Rua, número, complemento, bairro, cidade"
              className="bg-gray-800 border-gray-700"
            />
          </div>

          <div className="space-y-2">
            <Label>Forma de pagamento</Label>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`border rounded-lg p-4 cursor-pointer ${
                  paymentMethod === "dinheiro"
                    ? "border-krecao-yellow bg-gray-800"
                    : "border-gray-700"
                }`}
                onClick={() => setPaymentMethod("dinheiro")}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">Dinheiro</span>
                  {paymentMethod === "dinheiro" && (
                    <div className="h-3 w-3 bg-krecao-yellow rounded-full"></div>
                  )}
                </div>
                <p className="text-sm text-gray-400">
                  Pague em dinheiro na entrega
                </p>
              </div>
              <div
                className={`border rounded-lg p-4 cursor-pointer ${
                  paymentMethod === "cartao"
                    ? "border-krecao-yellow bg-gray-800"
                    : "border-gray-700"
                }`}
                onClick={() => setPaymentMethod("cartao")}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">Cartão</span>
                  {paymentMethod === "cartao" && (
                    <div className="h-3 w-3 bg-krecao-yellow rounded-full"></div>
                  )}
                </div>
                <p className="text-sm text-gray-400">
                  Pague com cartão na entrega
                </p>
              </div>
            </div>
          </div>

          {/* Additional fields for cash payment with change */}
          {paymentMethod === "dinheiro" && (
            <div className="space-y-2 border border-gray-700 p-4 rounded-lg bg-gray-800/50 animate-fadeIn">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="needChange"
                  checked={needChange}
                  onChange={(e) => setNeedChange(e.target.checked)}
                  className="h-4 w-4 accent-krecao-yellow"
                />
                <Label htmlFor="needChange">Precisa de troco?</Label>
              </div>
              
              {needChange && (
                <div className="space-y-2 mt-2 animate-fadeIn">
                  <Label htmlFor="changeAmount">Troco para quanto?</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      R$
                    </span>
                    <Input
                      id="changeAmount"
                      type="text"
                      value={changeAmount}
                      onChange={(e) => setChangeAmount(e.target.value)}
                      placeholder="0,00"
                      className="bg-gray-800 border-gray-700 pl-10"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <Button
            type="submit"
            className="w-full mt-8 bg-krecao-red hover:bg-krecao-red/90 py-6 text-lg font-bold"
            disabled={loading}
          >
            {loading ? "Processando..." : "Confirmar Pedido pelo WhatsApp"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
