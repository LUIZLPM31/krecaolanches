
export function AboutUs() {
  return <section id="sobre" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img 
              alt="Equipe K-recão Lanches" 
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
              className="rounded-lg shadow-2xl w-full h-[400px] object-cover" 
            />
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Sobre o <span className="text-krecao-red">K-recão</span> <span className="text-krecao-yellow">Lanches</span>
            </h2>
            
            <div className="w-20 h-1 bg-krecao-yellow mb-6"></div>
            
            <p className="text-gray-300 mb-6">
              Desde 2010, o <span className="text-krecao-yellow font-semibold">K-recão Lanches</span> tem se dedicado a oferecer os melhores hambúrgueres e lanches da cidade. 
              Nossa paixão pela gastronomia e compromisso com a qualidade nos tornaram referência quando o assunto é hambúrguer artesanal.
            </p>
            
            <p className="text-gray-300 mb-6">
              Utilizamos apenas ingredientes selecionados e receitas exclusivas para garantir uma experiência única aos nossos clientes. 
              Cada hambúrguer é preparado na hora, com carinho e dedicação por nossa equipe de profissionais.
            </p>
            
            <p className="text-gray-300 mb-6">
              Nossa equipe é formada por especialistas apaixonados pela culinária, sempre prontos para preparar os melhores lanches para você e sua família.
            </p>
            
            <p className="text-gray-300 font-semibold">
              Venha conhecer o <span className="text-krecao-red">K-recão Lanches</span> e descubra por que somos a escolha preferida dos amantes de hambúrgueres!
            </p>
          </div>
        </div>
      </div>
    </section>;
}
