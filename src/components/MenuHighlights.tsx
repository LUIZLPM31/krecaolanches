import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    name: "Xis Salada",
    description: "Hambúrguer artesanal, queijo cheddar, bacon crocante, alface e tomate.",
    price: "R$ 29,90",
    image: "/lovable-uploads/d936da9b-59e0-4c24-9293-8e6340fe127a.png"
  },
  {
    name: "Xis Calabresa",
    description: "Dois hambúrgueres artesanais, queijo duplo, calabresa e molho especial.",
    price: "R$ 34,90",
    image: "/lovable-uploads/e8979a79-1dfc-4ed6-ae36-59940dc39802.png"
  },
  {
    name: "Xis Frango",
    description: "Filé de frango grelhado, queijo, bacon, cebola caramelizada e molho da casa.",
    price: "R$ 32,90",
    image: "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    name: "Xis Coração",
    description: "Coração de frango grelhado, queijo, alface, tomate e molho especial.",
    price: "R$ 33,90",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    name: "Xis Acebolado",
    description: "Filé de frango empanado, queijo, cebola caramelizada, alface e molho especial.",
    price: "R$ 31,90",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    name: "Xis 4 Queijos",
    description: "Hambúrguer artesanal com blend de 4 queijos, bacon e molho especial.",
    price: "R$ 32,90",
    image: "https://images.unsplash.com/photo-1619994121345-b61cd21de54b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    name: "Xis K-recão",
    description: "O xis especial da casa com hambúrguer duplo, queijo, bacon, ovo e molho K-recão.",
    price: "R$ 36,90",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    name: "Batata Frita K-recão",
    description: "Porção de batata frita crocante com queijo cheddar e bacon.",
    price: "R$ 19,90",
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
  },
];

export function MenuHighlights() {
  return (
    <section id="cardapio" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nossos <span className="text-krecao-red">Destaques</span>
          </h2>
          <div className="w-20 h-1 bg-krecao-yellow mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-xl mx-auto">
            Experimente nossos lanches mais populares, preparados com ingredientes frescos e de alta qualidade.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {menuItems.map((item, index) => (
            <Card 
              key={index} 
              className="bg-black border border-gray-800 overflow-hidden hover:border-krecao-yellow transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/3">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                    <p className="text-gray-400 mb-4">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-krecao-yellow font-bold text-xl">{item.price}</span>
                    <button 
                      className="text-krecao-red hover:text-krecao-yellow transition-colors text-sm font-semibold"
                      onClick={() => window.open('https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqBB8HG_-HUE2-8McvH9CSGuQ2QuLsGlnnVCPGkDYm0kNCNCdZi', '_blank')}
                    >
                      Pedir Agora
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            className="bg-krecao-red hover:bg-krecao-red/90 text-white rounded-full px-8 py-6 text-lg"
            onClick={() => window.open('https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqBB8HG_-HUE2-8McvH9CSGuQ2QuLsGlnnVCPGkDYm0kNCNCdZi', '_blank')}
          >
            Ver Cardápio Completo
          </Button>
        </div>
      </div>
    </section>
  );
}
