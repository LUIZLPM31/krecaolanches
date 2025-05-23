
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";
import { useIsMobile } from "@/hooks/use-mobile";

interface ThemeToggleProps {
  className?: string;
  variant?: "button" | "toggle";
}

export function ThemeToggle({ className, variant = "button" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const isLight = theme === "light";
  
  if (variant === "toggle" || isMobile) {
    return (
      <Toggle
        pressed={isLight}
        onPressedChange={toggleTheme}
        className={cn(
          "border-0 hover:bg-transparent hover:text-current",
          isLight ? "text-yellow-500" : "text-blue-400",
          className
        )}
        aria-label={`Mudar para modo ${isLight ? "escuro" : "claro"}`}
      >
        {isLight ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Toggle>
    );
  }
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn("rounded-full", className)}
      aria-label={`Mudar para modo ${isLight ? "escuro" : "claro"}`}
    >
      {isLight ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-blue-400" />
      )}
    </Button>
  );
}
