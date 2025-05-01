
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&h=1300&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>
      
      <div className="container relative z-10 mx-auto px-6 py-32 md:py-0">
        <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            <span className="text-krecao-yellow">Sabor</span> e <span className="text-krecao-red">Qualidade</span> em cada mordida
          </h1>
          
          <p className="mt-6 text-xl text-gray-300 max-w-xl">
            Experimente os melhores lanches da cidade. Do clássico ao gourmet, 
            temos uma variedade de opções para satisfazer seu paladar.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-krecao-red hover:bg-krecao-red/90 text-white rounded-full px-8 py-6 text-lg"
              onClick={() => window.open('https://www.ifood.com.br/', '_blank')}
            >
              Pedir no iFood
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 text-lg"
              onClick={() => window.open('https://wa.me/5551981580205?text=Olá! Gostaria de fazer um pedido no K-recão Lanches.', '_blank')}
            >
              Pedir no WhatsApp
            </Button>
            <Button 
              variant="outline" 
              className="border-krecao-yellow text-krecao-yellow hover:bg-krecao-yellow/10 rounded-full px-8 py-6 text-lg"
              onClick={() => {
                const cardapioSection = document.getElementById('cardapio');
                if (cardapioSection) {
                  cardapioSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Ver Cardápio
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
