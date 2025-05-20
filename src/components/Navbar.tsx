
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, ShoppingCart, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const { user, signOut } = useAuth();
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
  
  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/90 backdrop-blur-sm py-4 shadow-lg" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/lovable-uploads/93e5cd42-eca6-41a9-92d5-35b49e1d113f.png" alt="K-recão Lanches" className="h-12 md:h-14" />
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center gap-6">
            {filteredNavLinks.map(link => (
              <Button
                key={link.name}
                variant="ghost"
                onClick={() => handleNavigation(link.href)}
                className="text-white rounded font-normal bg-transparent"
              >
                {link.name}
              </Button>
            ))}

            {user ? (
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/profile')}
                  className="bg-transparent hover:bg-gray-800 rounded-full p-1"
                >
                  <Avatar className="h-8 w-8 border border-gray-600">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-gray-700">
                      {user.user_metadata?.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
                <Button variant="outline" onClick={handleAuthAction} className="border-gray-700 text-stone-50 bg-krecao-red">
                  <User className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={handleAuthAction} className="border-gray-700 text-stone-50 bg-krecao-red">
                <User className="mr-2 h-4 w-4" />
                Entrar
              </Button>
            )}
          </nav>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <Sheet>
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
                {filteredNavLinks.map(link => (
                  <Button
                    key={link.name}
                    variant="ghost"
                    onClick={() => {
                      handleNavigation(link.href);
                    }}
                    className=""
                  >
                    {link.name}
                  </Button>
                ))}

                {user && (
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigation("/profile")}
                    className="flex items-center justify-start gap-2"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-gray-700 text-xs">
                        {user.user_metadata?.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    Meu Perfil
                  </Button>
                )}

                <div className="space-y-4 mt-6">
                  <Button onClick={() => navigate("/menu")} className="w-full bg-EB0101 hover:bg-EB0101/90 text-white">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Pedir Agora
                  </Button>
                  <Button variant="outline" onClick={handleAuthAction} className="w-full bg-black hover:bg-EB0101/90 text-white">
                    <User className="mr-2 h-4 w-4" />
                    {user ? "Sair" : "Entrar"}
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
}
