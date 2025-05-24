
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  variant?: "button" | "toggle";
}

export function ThemeToggle({ className, variant = "button" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const isLight = theme === "light";
  
  const icon = isLight ? (
    <Sun className="h-5 w-5" />
  ) : (
    <Moon className="h-5 w-5" />
  );
  
  const ariaLabel = `Mudar para modo ${isLight ? "escuro" : "claro"}`;
  const iconColor = isLight ? "text-yellow-500" : "text-blue-400";
  
  if (variant === "toggle" || isMobile) {
    return (
      <Toggle
        pressed={isLight}
        onPressedChange={toggleTheme}
        className={cn(
          "border-0 hover:bg-transparent hover:text-current",
          iconColor,
          className
        )}
        aria-label={ariaLabel}
      >
        {icon}
      </Toggle>
    );
  }
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn("rounded-full", className)}
      aria-label={ariaLabel}
    >
      <span className={iconColor}>
        {icon}
      </span>
    </Button>
  );
}
