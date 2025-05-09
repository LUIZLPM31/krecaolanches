
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export function useAuthForms() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta ao K-recão Lanches.",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Added explicit return type to fix the TypeScript error
  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      // First check if email exists in profiles table
      const { data } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email);
      
      if (data && data.length > 0) {
        return true;
      }
    
      // Adding explicit type annotations to help TypeScript
      const dummyPassword = `dummy-password-${Date.now()}`;
      
      // Simplifying the logic to avoid deep type inference
      const signInResult = await supabase.auth.signInWithPassword({
        email,
        password: dummyPassword,
      });
      
      // Check if error message contains "Invalid login credentials"
      return Boolean(signInResult.error?.message?.includes('Invalid login credentials'));
    } catch (err) {
      console.error("Error checking email:", err);
      return false;
    }
  };

  const handleSignUp = async (email: string, password: string, name: string, phone: string) => {
    setLoading(true);

    try {
      const emailExists = await checkEmailExists(email);
      
      if (emailExists) {
        toast({
          title: "Email já cadastrado",
          description: "Este email já está em uso. Por favor, use outro email ou faça login.",
          variant: "destructive",
        });
        return false;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone
          },
        },
      });

      if (error) throw error;
      
      toast({
        title: "Conta criada com sucesso!",
        description: "Você será redirecionado ao fazer login.",
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSignIn,
    handleSignUp
  };
}
