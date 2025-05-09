
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MenuHighlights } from "@/components/MenuHighlights";
import { AboutUs } from "@/components/AboutUs";
import { Location } from "@/components/Location";
import { FAQ } from "@/components/FAQ";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <MenuHighlights />
      <AboutUs />
      <Location />
      <FAQ />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
