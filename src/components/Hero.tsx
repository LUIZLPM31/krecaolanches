
import { Button } from "@/components/ui/button";
export function Hero() {
  return <section id="inicio" className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden" style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&h=1300&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>
      
      <div className="container relative z-10 mx-auto px-6 py-32 md:py-0">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto animate-fade-in">
          <div className="mb-8 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-krecao-yellow via-krecao-red to-krecao-yellow rounded-full opacity-75 blur-sm animate-pulse"></div>
            <img 
              src="/lovable-uploads/92641e43-c92a-4a0e-afcd-6e233c81adde.png" 
              alt="K-recão Lanches Logo" 
              className="h-32 md:h-40 relative animate-[pulse_3s_ease-in-out_infinite] hover:scale-110 transition-transform duration-300"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            <span className="text-krecao-yellow">Melhor</span> lanche da <span className="text-krecao-red">zona sul</span>
          </h1>
          
          <p className="mt-6 text-xl text-gray-300 max-w-xl">
            Experimente os melhores lanches da cidade. Do clássico ao gourmet, 
            temos uma variedade de opções para satisfazer seu paladar.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button className="bg-krecao-red hover:bg-krecao-red/90 text-white rounded-full px-8 py-6 text-lg" onClick={() => window.open('https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqBB8HG_-HUE2-8McvH9CSGuQ2QuLsGlnnVCPGkDYm0kNCNCdZi', '_blank')}>
              Pedir no iFood
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 text-lg" onClick={() => window.open('https://wa.me/5132422047?text=Olá! Gostaria de fazer um pedido no K-recão Lanches.', '_blank')}>
              Pedir no WhatsApp
            </Button>
            
          </div>
        </div>
      </div>
    </section>;
}
