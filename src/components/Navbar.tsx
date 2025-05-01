
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      'fixed top-0 w-full z-50 transition-all duration-300',
      isScrolled ? 'bg-black/90 shadow-md backdrop-blur-sm py-2' : 'bg-transparent py-4'
    )}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <img 
              src="/lovable-uploads/369cbff8-45a9-4e10-bb26-ffb7772c9445.png" 
              alt="K-recão Lanches" 
              className="h-12 md:h-16" 
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink href="#inicio">Início</NavLink>
            <NavLink href="#cardapio">Cardápio</NavLink>
            <NavLink href="#sobre">Sobre</NavLink>
            <NavLink href="#localizacao">Localização</NavLink>
            <NavLink href="#contato">Contato</NavLink>
            <Button 
              className="bg-krecao-red hover:bg-krecao-red/90 text-white rounded-full px-6"
              onClick={() => window.open('https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqBB8HG_-HUE2-8McvH9CSGuQ2QuLsGlnnVCPGkDYm0kNCNCdZi', '_blank')}
            >
              Pedir Agora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 shadow-xl backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink href="#inicio" onClick={() => setIsMenuOpen(false)}>Início</MobileNavLink>
            <MobileNavLink href="#cardapio" onClick={() => setIsMenuOpen(false)}>Cardápio</MobileNavLink>
            <MobileNavLink href="#sobre" onClick={() => setIsMenuOpen(false)}>Sobre</MobileNavLink>
            <MobileNavLink href="#localizacao" onClick={() => setIsMenuOpen(false)}>Localização</MobileNavLink>
            <MobileNavLink href="#contato" onClick={() => setIsMenuOpen(false)}>Contato</MobileNavLink>
            <Button 
              className="bg-krecao-red hover:bg-krecao-red/90 text-white w-full"
              onClick={() => {
                window.open('https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqBB8HG_-HUE2-8McvH9CSGuQ2QuLsGlnnVCPGkDYm0kNCNCdZi', '_blank');
                setIsMenuOpen(false);
              }}
            >
              Pedir Agora
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="text-white font-medium hover:text-krecao-yellow transition-colors"
    >
      {children}
    </a>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="text-white text-lg font-medium hover:text-krecao-yellow transition-colors py-2 border-b border-gray-800"
      onClick={onClick}
    >
      {children}
    </a>
  );
}
