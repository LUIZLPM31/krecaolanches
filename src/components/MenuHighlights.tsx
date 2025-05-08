import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
export interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  category?: string;
  ifoodUrl?: string;
}
export const menuItems: MenuItem[] = [{
  name: "Xis Salada",
  description: "Hamburguer Artesanal,Maionese,Tomate,Alface,Milho,Mostarda,Catchup,Queijo,Ovo",
  price: "R$ 31,00",
  image: "/lovable-uploads/c7c76be9-f6aa-4af8-9787-3ba84363461b.png",
  category: "Xis",
  ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=5eb6dfbb-e4c3-461a-ad19-ee6e04be31c3"
}, {
  name: "Xis Calabresa",
  description: " Acompanha maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
  price: "R$ 34,90",
  image: "/lovable-uploads/e8979a79-1dfc-4ed6-ae36-59940dc39802.png",
  category: "Xis",
  ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=5a73aae8-1a96-4b0f-948d-cca9c082fd5c"
}, {
  name: "Xis Frango",
  description: "Acompanha maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
  price: "R$ 32,90",
  image: "/lovable-uploads/237a70a4-42a7-450d-8a50-41b539516fea.png",
  category: "Xis",
  ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=60222e84-34f0-4fa4-8941-3a4bccd3f98f"
}, {
  name: "Xis Coração",
  description: "Acompanha maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
  price: "R$ 33,90",
  image: "/lovable-uploads/93c3515b-97af-4030-bac5-6b5295450e52.png",
  category: "Xis",
  ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=78139c90-c746-45ec-b544-b4078b87ff3a"
}, {
  name: "Xis Acebolado",
  description: "Acompanha maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
  price: "R$ 31,90",
  image: "/lovable-uploads/0ca95bf4-e833-45e8-b142-e074365f0d95.png",
  category: "Xis",
  ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=b6176dfe-814d-44ab-81be-6fd75c5ceefb"
}, {
  name: "Xis 4 Queijos",
  description: "Hambúrguer artesanal com blend de 4 queijos, bacon e molho especial. Acompanha maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
  price: "R$ 32,90",
  image: "https://postimg.cc/mtKsN0T0",
  category: "Xis",
  ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=5c6786e3-98e1-4a63-81fc-a2417f45d0b4"
}, {
  name: "Xis K-recão",
  description: "Acompanha frango,coração, calabresa, bacon, carne, maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
  price: "R$ 36,90",
  image: "/lovable-uploads/6d4d9c64-03db-4cb5-a0d4-598ba5b8f318.png",
  category: "Xis",
  ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=47e56877-8690-4573-b568-0a45da6ffbfc"
}, {
  name: "Batata Frita G",
  description: "Porção de batata frita crocante com queijo cheddar e bacon.",
  price: "R$ 37,00",
  image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
  category: "Porções",
  ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=3612fbe3-44cf-4bd6-b0e1-e0d538828057"
}, {
  name: "Stogonoff especial ",
  description: "Acompanha maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo. Serve 2 pessoas (1100g).",
  price: "R$ 68,00",
  image: "/lovable-uploads/f4ef723c-4098-49f8-a54c-ad4af8303f1f.png",
  category: "Porções",
  ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=88dbbcd0-4958-40c4-b50a-84bbfbb96039"
}, {
  name: "Bauru De Alcatra Com Fritas",
  description: "Pão Cervejinha, Bife De Alcatra, Maionese, Tomate Em Rodelas, Folhas De Alface, Queijo, Ovo E Fritas. Serve 2 pessoas.",
  price: "R$ 59,00",
  image: "/lovable-uploads/a5f32f77-8219-4d5b-beb5-b163c604f4e5.png",
  category: "Lanches",
  ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=b3e26e55-7bcb-4fd4-9dc7-44010294891a"
}, {
  name: "Dog especial",
  description: "1 Salsicha, Maionese, Tomate, Alface, Milho, Mostarda, Catchup, Molho, Queijo Mussarela. Serve 1 pessoa.",
  price: "R$ 23,00",
  image: "/lovable-uploads/abd68998-91bc-4cb4-a7a2-dbb5366adcf2.png",
  category: "Lanches"
}, {
  name: "Ala Minuta De Bife Na Chapa Promo",
  description: "Bife (Coxão De Dentro), arroz, ovo e batatas fritas. Serve 1 pessoa.",
  price: "R$ 36,50",
  image: "/lovable-uploads/9b68fa7a-09c7-457c-bbe8-d6c68da3dff5.png",
  category: "Pratos"
}, {
  name: "Iscas De Tilápia",
  description: "Iscas De Tilápia Empanadas 500g, Acompanha Ovos De Codorna, Pepino Conserva, Azeitonas, Limão",
  price: "R$ 75,00",
  image: "data:image/jpeg;base64,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",
  category: "Porções",
  ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=ace9aae0-c588-4c1f-8486-c15b28f9d0e3"
}, {
  name: "Prensado",
  description: "Maionese, tomate, alface, presunto, queijo e ovo. Serve 1 pessoa.",
  price: "R$ 22,60",
  image: "/lovable-uploads/67740c08-faea-4884-a10e-2bca132fd95c.png",
  category: "Lanches"
}];
export function MenuHighlights() {
  const navigate = useNavigate();
  const handleViewFullMenu = () => {
    navigate('/menu');
  };
  return <section id="cardapio" className="py-24 bg-black">
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
          {menuItems.map((item, index) => <Card key={index} className="bg-black border border-gray-800 overflow-hidden hover:border-krecao-yellow transition-all duration-300">
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/3">
                  <img src={item.image} alt={item.name} className="w-full h-48 md:h-full object-cover" />
                </div>
                <div className="p-6 md:w-2/3 flex flex-col justify-between bg-gray-950">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                    <p className="text-gray-400 mb-4">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-krecao-yellow font-bold text-xl">{item.price}</span>
                    <button onClick={() => window.open(item.ifoodUrl || 'https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqBB8HG_-HUE2-8McvH9CSGuQ2QuLsGlnnVCPGkDYm0kNCNCdZi', '_blank')} className="text-white font-medium px-4 py-2 rounded-full flex items-center gap-1.5 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-krecao-red/30 bg-red-700 hover:bg-red-600">
                      Pedir <ExternalLink className="h-4 w-4 bg-transparent" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>)}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-krecao-red hover:bg-krecao-red/90 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-krecao-red/30 transition-all duration-300 transform hover:scale-105" onClick={handleViewFullMenu}>
            Ver Cardápio Completo
          </Button>
        </div>
      </div>
    </section>;
}