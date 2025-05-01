
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export function ContactForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Mensagem enviada!",
        description: "Agradecemos seu contato. Responderemos em breve.",
      });
      
      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <section id="contato" className="py-24 bg-gradient-to-t from-black to-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Entre em <span className="text-krecao-red">Contato</span>
          </h2>
          <div className="w-20 h-1 bg-krecao-yellow mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-xl mx-auto">
            Tem alguma dúvida, sugestão ou quer fazer um pedido especial? Preencha o formulário abaixo e entraremos em contato.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">Nome</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 focus:border-krecao-yellow text-white"
                  placeholder="Seu nome"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 focus:border-krecao-yellow text-white"
                  placeholder="Seu email"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-white mb-2">Telefone</label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-gray-800 border-gray-700 focus:border-krecao-yellow text-white"
                placeholder="(00) 00000-0000"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-white mb-2">Mensagem</label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="bg-gray-800 border-gray-700 focus:border-krecao-yellow text-white h-40"
                placeholder="Digite sua mensagem"
              />
            </div>
            
            <Button 
              type="submit" 
              className="bg-krecao-red hover:bg-krecao-red/90 text-white w-full py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
