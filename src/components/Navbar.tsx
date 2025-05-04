import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  // Filter links based on user's admin status
  const filteredNavLinks = navLinks.filter(link => !link.adminOnly || link.adminOnly && isAdmin);
  return <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/90 backdrop-blur-sm py-4 shadow-lg" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="font-bold text-2xl text-white">
            <span className="text-krecao-red">K-recão</span> Lanches
          </div>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && <nav className="flex items-center gap-6">
            {filteredNavLinks.map(link => <Link key={link.name} to={link.href} className="font-medium text-gray-300 hover:text-white transition-colors">
                {link.name}
              </Link>)}
            <Button onClick={() => navigate("/menu")} className="bg-krecao-red hover:bg-krecao-red/90 text-white">
              <ShoppingCart className="mr-2 h-4 w-4" /> Pedir Agora
            </Button>
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
              <nav className="flex flex-col gap-6 mt-12">
                {filteredNavLinks.map(link => <Link key={link.name} to={link.href} className="text-xl font-medium text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>)}
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