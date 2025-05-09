
import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { toast } from "@/hooks/use-toast";

// Define types for our auth context
interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook for auth provider
const useAuthProvider = (): AuthContextType => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
  });

  // Function to refresh the session
  const refreshSession = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      setAuthState(prevState => ({
        ...prevState,
        session: data.session,
        user: data.session?.user ?? null,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error refreshing session:", error);
      setAuthState(prevState => ({ ...prevState, isLoading: false }));
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Desconectado",
        description: "Você foi desconectado com sucesso."
      });
    } catch (error: any) {
      toast({
        title: "Erro ao desconectar",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    // Initial session check
    refreshSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthState({
          session,
          user: session?.user ?? null,
          isLoading: false,
        });
      }
    );

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  return {
    ...authState,
    signOut,
    refreshSession,
  };
};

// Auth Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthProvider();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
