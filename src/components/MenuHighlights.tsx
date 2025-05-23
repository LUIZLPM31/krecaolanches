import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ExternalLink, Plus } from "lucide-react";
import { homeMenuItems } from "@/data/homeMenuItems";
export function MenuHighlights() {
  const navigate = useNavigate();
  const handleViewFullMenu = () => {
    navigate('/menu');
  };
  return <section id="cardapio" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow mb-4">
            Nossos <span className="text-krecao-red">Destaques</span>
          </h2>
          <div className="w-20 h-1 bg-krecao-yellow mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-xl mx-auto">
            Experimente nossos lanches mais populares, preparados com ingredientes frescos e de alta qualidade.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {homeMenuItems.map((item, index) => <Card key={index} className="bg-gray-900 border border-gray-800 overflow-hidden hover:border-krecao-yellow transition-all duration-300 group">
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/3 relative">
                  <img src={item.image} alt={item.name} className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-0 left-0 bg-krecao-red px-2 py-1 text-xs font-bold">
                    {item.category}
                  </div>
                </div>
                <div className="p-6 md:w-2/3 flex flex-col justify-between bg-gray-950">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-krecao-yellow transition-colors">{item.name}</h3>
                      <span className="bg-krecao-yellow text-black px-2 py-1 rounded text-sm font-bold">{item.price}</span>
                    </div>
                    <p className="text-gray-400 mb-4">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <Button onClick={() => window.open(item.ifoodUrl || 'https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqBB8HG_-HUE2-8McvH9CSGuQ2QuLsGlnnVCPGkDYm0kNCNCdZi', '_blank')} className="bg-krecao-red hover:bg-krecao-red/90 group-hover:bg-krecao-yellow transition-all duration-300 transform hover:scale-105 rounded-full shadow-lg hover:shadow-krecao-yellow/30 flex items-center gap-1.5 text-zinc-100">
                      <Plus className="h-4 w-4" /> Pedir <ExternalLink className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>)}
        </div>
        
        <div className="text-center mt-12">
          <Button onClick={handleViewFullMenu} className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105">Cardápio promocional</Button>
        </div>
      </div>
    </section>;
}