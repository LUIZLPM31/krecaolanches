
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MenuHighlights } from "@/components/MenuHighlights";
import { AboutUs } from "@/components/AboutUs";
import { Location } from "@/components/Location";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <MenuHighlights />
      <AboutUs />
      <Location />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
