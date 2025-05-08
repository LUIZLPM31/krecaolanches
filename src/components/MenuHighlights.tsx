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
  image: "https://i.postimg.cc/BbBX8F44/images.jpg",
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
  image: "https://i.postimg.cc/wMgBdBJP/download.jpg",
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