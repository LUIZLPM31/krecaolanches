
import { Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export function FAQ() {
  const faqs = [
    {
      question: "Qual é o horário de funcionamento?",
      answer: "Estamos abertos de segunda a sábado, das 18h às 23h30. Aos domingos, funcionamos das 18h às 23h."
    },
    {
      question: "Vocês fazem entregas?",
      answer: "Sim! Fazemos entregas por meio do iFood ou você pode solicitar diretamente via WhatsApp. A taxa de entrega varia conforme a região."
    },
    {
      question: "Quais formas de pagamento vocês aceitam?",
      answer: "Aceitamos dinheiro, cartões de crédito e débito, Pix e pagamento online através do iFood."
    },
    {
      question: "Qual é o tempo médio de entrega?",
      answer: "O tempo médio de entrega varia entre 30 a 45 minutos, dependendo da sua localização e do movimento do dia."
    },
    {
      question: "Vocês têm opções vegetarianas?",
      answer: "Sim, oferecemos opções vegetarianas em nosso cardápio. Consulte as opções disponíveis com nossos atendentes."
    },
    {
      question: "É possível personalizar meu lanche?",
      answer: "Com certeza! Você pode adicionar ou remover ingredientes conforme sua preferência. Basta informar ao realizar seu pedido."
    }
  ];

  return (
    <section id="faq" className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-krecao-yellow mb-4">Perguntas Frequentes</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossos produtos e serviços
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* FAQ Accordion */}
          <div className="bg-gray-900 rounded-lg p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border-b border-gray-800">
                  <AccordionTrigger className="text-white hover:text-krecao-yellow">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact CTA */}
          <div className="bg-gray-900 rounded-lg p-6 text-center flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold text-krecao-yellow mb-4">Ainda tem dúvidas?</h3>
            <p className="text-gray-400 mb-6">
              Entre em contato conosco por telefone ou WhatsApp para mais informações.
            </p>
            <div className="flex flex-col space-y-4 w-full max-w-sm">
              <Button 
                className="bg-krecao-red hover:bg-krecao-red/90 text-white flex items-center justify-center gap-2"
                onClick={() => window.open('tel:5132422047')}
              >
                <Phone size={18} />
                Ligar para (51) 3242-2047
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => window.open('https://wa.me/5132422047?text=Olá! Tenho uma dúvida sobre o K-recão Lanches.', '_blank')}
              >
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
