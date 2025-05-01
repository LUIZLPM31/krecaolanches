
import { Instagram, Facebook, Twitter, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer id="contato" className="bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2 lg:col-span-1">
            <img 
              src="/lovable-uploads/369cbff8-45a9-4e10-bb26-ffb7772c9445.png" 
              alt="K-recão Lanches" 
              className="h-16 mb-4" 
            />
            <p className="text-gray-400 mb-6">
              Oferecendo os melhores hambúrgueres e lanches desde 2010. Qualidade, sabor e atendimento de excelência.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/krecaolanches/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-krecao-red transition-colors rounded-full p-3"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.facebook.com/krecaolanches/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-krecao-red transition-colors rounded-full p-3"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://twitter.com/krecaolanches" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-krecao-red transition-colors rounded-full p-3"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://wa.me/5551981580205" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-green-600 transition-colors rounded-full p-3"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-krecao-yellow">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#inicio" className="text-gray-400 hover:text-krecao-red transition-colors">Início</a></li>
              <li><a href="#cardapio" className="text-gray-400 hover:text-krecao-red transition-colors">Cardápio</a></li>
              <li><a href="#sobre" className="text-gray-400 hover:text-krecao-red transition-colors">Sobre</a></li>
              <li><a href="#localizacao" className="text-gray-400 hover:text-krecao-red transition-colors">Localização</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-krecao-yellow">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Telefone: (51) 98158-0205</li>
              <li className="text-gray-400">Email: contato@krecaolanches.com.br</li>
              <li className="text-gray-400">Endereço: Rua Coronel Massot 649, Cristal, Porto Alegre, RS</li>
            </ul>
          </div>
          
          {/* Order Now */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-krecao-yellow">Peça Agora</h3>
            <p className="text-gray-400 mb-4">
              Faça seu pedido diretamente pelo iFood ou WhatsApp e receba no conforto da sua casa.
            </p>
            <div className="space-y-3">
              <Button 
                className="bg-krecao-red hover:bg-krecao-red/90 text-white w-full"
                onClick={() => window.open('https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqBB8HG_-HUE2-8McvH9CSGuQ2QuLsGlnnVCPGkDYm0kNCNCdZi', '_blank')}
              >
                Pedir no iFood
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white w-full"
                onClick={() => window.open('https://wa.me/5551981580205?text=Olá! Gostaria de fazer um pedido no K-recão Lanches.', '_blank')}
              >
                Pedir pelo WhatsApp
              </Button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} K-recão Lanches. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
