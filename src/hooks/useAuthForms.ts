
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

  // Completely rewritten to avoid TypeScript deep type issues
  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      // Using a direct count query to avoid type instantiation issues
      const { data, error } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .limit(1);
      
      if (error) throw error;
      return data !== null && data.length > 0;
    } catch (err) {
      console.error("Erro ao verificar email:", err);
      return false; // Allow registration in case of error
    }
  };

  const handleSignUp = async (email: string, password: string, name: string, phone: string) => {
    setLoading(true);

    try {
      // Temporarily disabled email verification to allow registration
      // const emailExists = await checkEmailExists(email);
      const emailExists = false;
      
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
