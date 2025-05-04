
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MenuHighlights } from "@/components/MenuHighlights";
import { AboutUs } from "@/components/AboutUs";
import { Location } from "@/components/Location";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-6 py-8 text-center">
        <Button 
          onClick={() => navigate('/menu')}
          className="bg-krecao-red hover:bg-krecao-red/90 py-6 px-8 text-lg"
        >
          <ShoppingCart className="mr-2 h-5 w-5" /> Ver Cardápio Completo
        </Button>
      </div>
      <MenuHighlights />
      <AboutUs />
      <Location />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
