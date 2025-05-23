
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface NavLink {
  name: string;
  href: string;
  isExternal?: boolean;
  adminOnly?: boolean;
}

interface NavLinksProps {
  links: NavLink[];
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}

export function NavLinks({ links, variant = "desktop", onNavigate }: NavLinksProps) {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
    if (onNavigate) onNavigate();
  };
  
  return (
    <>
      {links.map(link => (
        <Button 
          key={link.name} 
          variant="ghost" 
          onClick={() => handleNavigation(link.href)} 
          className={variant === "desktop" 
            ? "text-white dark:text-white rounded font-normal bg-transparent" 
            : "text-xl rounded-sm"
          }
        >
          {link.name}
        </Button>
      ))}
    </>
  );
}
