import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, ShoppingCart, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
interface NavLink {
  name: string;
  href: string;
  isExternal?: boolean;
  adminOnly?: boolean;
}
export function Navbar() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user,
    signOut
  } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navLinks: NavLink[] = [{
    name: "Início",
    href: "/"
  }, {
    name: "Cardápio",
    href: "/menu"
  }, {
    name: "Admin",
    href: "/admin",
    adminOnly: true
  }];
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    // Check if user is admin
    const checkAdminStatus = async () => {
      if (user) {
        // This is a simple check - in a real app, you might want to query the database
        const isUserAdmin = user?.app_metadata?.role === "admin";
        setIsAdmin(isUserAdmin);
      }
    };
    checkAdminStatus();
  }, [user]);
  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate("/auth");
    }
  };
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Filter links based on user's admin status
  const filteredNavLinks = navLinks.filter(link => !link.adminOnly || link.adminOnly && isAdmin);
  return <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/90 backdrop-blur-sm py-4 shadow-lg" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/lovable-uploads/93e5cd42-eca6-41a9-92d5-35b49e1d113f.png" alt="K-recão Lanches" className="h-12 md:h-14" />
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && <nav className="flex items-center gap-6">
            {filteredNavLinks.map(link => <Button key={link.name} variant="ghost" onClick={() => handleNavigation(link.href)} className="text-white rounded font-normal bg-transparent">
                {link.name}
              </Button>)}
            
            <Button variant="outline" onClick={handleAuthAction} className="border-gray-700 text-stone-50 bg-red-600 hover:bg-red-500">
              <User className="mr-2 h-4 w-4" />
              {user ? "Sair" : "Entrar"}
            </Button>
          </nav>}

        {/* Mobile Navigation */}
        {isMobile && <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-black/95 text-white border-gray-800">
              <div className="flex justify-center mb-8 mt-4">
                <img src="/lovable-uploads/93e5cd42-eca6-41a9-92d5-35b49e1d113f.png" alt="K-recão Lanches" className="h-16" />
              </div>
              <nav className="flex flex-col gap-6">
                {filteredNavLinks.map(link => <Button key={link.name} variant="ghost" onClick={() => {
              handleNavigation(link.href);
            }} className={`text-xl font-medium hover:text-white transition-colors justify-start ${location.pathname === link.href ? "text-white" : "text-gray-300"}`}>
                    {link.name}
                  </Button>)}
                <div className="space-y-4 mt-6">
                  <Button onClick={() => navigate("/menu")} className="w-full bg-krecao-red hover:bg-krecao-red/90 text-white">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Pedir Agora
                  </Button>
                  <Button variant="outline" onClick={handleAuthAction} className="w-full border-gray-700 text-white hover:bg-gray-800">
                    <User className="mr-2 h-4 w-4" />
                    {user ? "Sair" : "Entrar"}
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>}
      </div>
    </header>;
}