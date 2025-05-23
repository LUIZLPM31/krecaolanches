
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserMenuProps {
  isMobile?: boolean;
}

export function UserMenu({ isMobile }: UserMenuProps) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // Get user's name from metadata or email
  const userName = user ? user.user_metadata?.name || user.email?.split('@')[0] || 'Usuário' : null;
  
  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate("/auth");
    }
  };

  if (isMobile) {
    return (
      <>
        {user && (
          <div className="text-center mb-2 py-2 border-b border-gray-800">
            <p className="text-lg">Olá, <span className="font-medium">{userName}</span>!</p>
          </div>
        )}
        
        {user && (
          <Button 
            variant="ghost" 
            onClick={() => navigate("/profile")} 
            className="flex items-center justify-start gap-2"
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-krecao-red text-lg font-semibold text-white">
                {user.user_metadata?.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            Meu Perfil
          </Button>
        )}
        
        <Button 
          variant="outline" 
          onClick={handleAuthAction} 
          className="w-full hover:bg-krecao-red/90 text-white bg-krecao-red"
        >
          <User className="mr-2 h-4 w-4" />
          {user ? "Sair" : "Entrar"}
        </Button>
      </>
    );
  }
  
  return (
    <>
      {user ? (
        <div className="flex items-center gap-4">
          <div className="text-white dark:text-white">
            Olá, <span className="font-medium">{userName}</span>!
          </div>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/profile')} 
            className="bg-transparent hover:bg-gray-800 dark:hover:bg-gray-700 rounded-full p-1"
          >
            <Avatar className="h-8 w-8 border border-gray-600">
              <AvatarImage src={user.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-krecao-red font-bold">
                {user.user_metadata?.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
          <Button 
            variant="outline" 
            onClick={handleAuthAction} 
            className="border-gray-700 text-stone-50 bg-krecao-red"
          >
            <User className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      ) : (
        <Button 
          variant="outline" 
          onClick={handleAuthAction} 
          className="border-gray-700 text-stone-50 bg-krecao-red"
        >
          <User className="mr-2 h-4 w-4" />
          Entrar
        </Button>
      )}
    </>
  );
}
