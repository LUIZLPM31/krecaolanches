
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
    name: "K-recão Classic",
    description: "Hambúrguer artesanal, queijo cheddar, bacon crocante, alface e tomate.",
    price: "R$ 29,90",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    name: "K-recão Duplo Bacon",
    description: "Dois hambúrgueres artesanais, queijo duplo, muito bacon e molho especial.",
    price: "R$ 34,90",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    name: "K-recão Monster",
    description: "Três hambúrgueres artesanais, queijo, bacon, cebola caramelizada e molho da casa.",
    price: "R$ 39,90",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    name: "K-recão Vegetariano",
    description: "Hambúrguer de grão de bico, queijo, alface, tomate e molho especial.",
    price: "R$ 27,90",
    image: "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    name: "K-recão Frango Crocante",
    description: "Filé de frango empanado, queijo, alface, tomate e molho especial.",
    price: "R$ 31,90",
    image: "https://images.unsplash.com/photo-1615297363985-f115b325d756?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    name: "Super Dog K-recão",
    description: "Cachorro-quente completo com molho, queijo, bacon, batata palha e ervilha.",
    price: "R$ 25,90",
    image: "https://images.unsplash.com/photo-1619740455993-a8d1258678e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    name: "Combo Família",
    description: "4 hambúrgueres Classic, 2 porções de batata frita e 2 refrigerantes.",
    price: "R$ 99,90",
    image: "https://images.unsplash.com/photo-1610614819513-58e34989e371?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    name: "Batata Frita K-recão",
    description: "Porção de batata frita crocante com queijo cheddar e bacon.",
    price: "R$ 19,90",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
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
