
import { MapPin, Clock, Phone } from "lucide-react";

export function Location() {
  return (
    <section id="localizacao" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nossa <span className="text-krecao-red">Localização</span>
          </h2>
          <div className="w-20 h-1 bg-krecao-yellow mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-xl mx-auto">
            Venha nos visitar e experimente nossos deliciosos lanches. Estamos em uma localização privilegiada com fácil acesso.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.9430835761774!2d-51.22992492391836!3d-30.05098553385249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95197830e3b1a887%3A0x1ba748b30a3ac31f!2sR.%20Cel.%20Massot%2C%20649%20-%20Cristal%2C%20Porto%20Alegre%20-%20RS!5e0!3m2!1spt-BR!2sbr!4v1746073602621!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="450" 
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
          
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="bg-gray-900/70 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-6">Informações de Contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-krecao-red mt-1 mr-4" />
                  <div>
                    <h4 className="text-krecao-yellow font-semibold mb-1">Endereço:</h4>
                    <p className="text-gray-300">Rua Coronel Massot 649, Cristal, Porto Alegre, RS</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-krecao-red mt-1 mr-4" />
                  <div>
                    <h4 className="text-krecao-yellow font-semibold mb-1">Horário de Funcionamento:</h4>
                    <p className="text-gray-300">Segunda a Sexta: 11h às 23h</p>
                    <p className="text-gray-300">Sábados e Domingos: 11h às 00h</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-krecao-red mt-1 mr-4" />
                  <div>
                    <h4 className="text-krecao-yellow font-semibold mb-1">Telefone:</h4>
                    <p className="text-gray-300">(51) 98158-0205</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
