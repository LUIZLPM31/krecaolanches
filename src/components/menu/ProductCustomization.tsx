
import { useState } from "react";
import { CartItem } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface CustomizationItemProps {
  type: 'adicionar' | 'remover';
  description: string;
  price: number;
  index: number;
  onRemove: (index: number) => void;
}

function CustomizationItem({ type, description, price, index, onRemove }: CustomizationItemProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-700">
      <div className="flex-1">
        <p className="text-sm text-white">
          <span className={type === 'adicionar' ? "text-green-400" : "text-red-400"}>
            {type === 'adicionar' ? '+ ' : '- '}
          </span>
          {description}
        </p>
      </div>
      {type === 'adicionar' && (
        <span className="text-sm text-gray-400 mr-2">
          R$ {price.toFixed(2).replace('.', ',')}
        </span>
      )}
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => onRemove(index)}
        className="p-1 h-auto text-red-400 hover:text-red-300"
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
}

interface ProductCustomizationProps {
  item: CartItem;
  onAddCustomization: (customization: { type: 'adicionar' | 'remover', description: string, price: number }) => void;
  onRemoveCustomization: (index: number) => void;
}

export function ProductCustomization({ 
  item, 
  onAddCustomization, 
  onRemoveCustomization 
}: ProductCustomizationProps) {
  const [activeTab, setActiveTab] = useState<'adicionar' | 'remover'>('adicionar');
  const [customizationText, setCustomizationText] = useState("");
  const [customizationPrice, setCustomizationPrice] = useState("0");
  const [isAdditionalPaid, setIsAdditionalPaid] = useState(true);

  const handleSubmit = () => {
    if (!customizationText.trim()) return;
    
    onAddCustomization({ 
      type: activeTab, 
      description: customizationText.trim(), 
      price: activeTab === 'adicionar' && isAdditionalPaid ? 
        parseFloat(customizationPrice.replace(',', '.')) || 0 : 0 
    });
    
    // Resetar os campos
    setCustomizationText("");
    setCustomizationPrice("0");
  };

  return (
    <div className="mt-3">
      <Label htmlFor="customization" className="text-white mb-2 block">
        Personalizações
      </Label>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'adicionar' | 'remover')} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="adicionar" className="data-[state=active]:bg-green-600">Adicionar</TabsTrigger>
          <TabsTrigger value="remover" className="data-[state=active]:bg-red-600">Remover</TabsTrigger>
        </TabsList>

        <TabsContent value="adicionar" className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Ex: Adicionar bacon extra"
              value={customizationText}
              onChange={(e) => setCustomizationText(e.target.value)}
              className="bg-gray-800 text-white"
            />
            <div className="flex items-center space-x-2">
              <Switch
                checked={isAdditionalPaid}
                onCheckedChange={setIsAdditionalPaid}
                id="paid-switch"
              />
              <Label htmlFor="paid-switch" className="text-sm text-gray-300">
                Adicional pago
              </Label>
            </div>
            {isAdditionalPaid && (
              <div className="flex items-center gap-2">
                <span className="text-gray-300">R$</span>
                <Input
                  type="text"
                  placeholder="0,00"
                  value={customizationPrice}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9,]/g, '');
                    setCustomizationPrice(value);
                  }}
                  className="bg-gray-800 text-white"
                />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="remover" className="space-y-4">
          <Input
            placeholder="Ex: Sem cebola"
            value={customizationText}
            onChange={(e) => setCustomizationText(e.target.value)}
            className="bg-gray-800 text-white"
          />
        </TabsContent>

        <Button 
          onClick={handleSubmit} 
          className="w-full mt-2" 
          disabled={!customizationText.trim()}
        >
          <Plus size={16} className="mr-2" />
          {activeTab === 'adicionar' ? 'Adicionar item' : 'Remover item'}
        </Button>
      </Tabs>

      {item.customizations.length > 0 && (
        <Card className="mt-4 bg-gray-900 border-gray-800">
          <CardContent className="pt-4">
            <h4 className="font-semibold text-white mb-2">Personalizações do item</h4>
            <div className="divide-y divide-gray-700">
              {item.customizations.map((customization, index) => (
                <CustomizationItem
                  key={index}
                  type={customization.type}
                  description={customization.description}
                  price={customization.price}
                  index={index}
                  onRemove={onRemoveCustomization}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
