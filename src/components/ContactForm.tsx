import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
export function ContactForm() {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Mensagem enviada!",
        description: "Agradecemos seu contato. Responderemos em breve."
      });

      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    }, 1500);
  };
  return <section id="contato" className="py-20 bg-black">
      <div className="container auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            Fale <span className="text-krecao-yellow">Conosco</span>
          </h2>
          
          <div className="w-20 h-1 bg-krecao-yellow mx-auto mb-10"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">Nome</label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Seu nome" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Seu email" className="bg-gray-800 border-gray-700 text-white" />
              </div>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-white mb-2">Telefone</label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Seu telefone" className="bg-gray-800 border-gray-700 text-white" />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-white mb-2">Mensagem</label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="Sua mensagem" className="bg-gray-800 border-gray-700 text-white min-h-[120px]" />
            </div>
            
            <Button type="submit" disabled={isSubmitting} className="w-full bg-krecao-red hover:bg-krecao-red/90 text-white py-3">
              {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </form>
        </div>
      </div>
    </section>;
}