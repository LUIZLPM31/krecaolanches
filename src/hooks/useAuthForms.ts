
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

  // Updated function to check email existence
  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      // Check if email exists in profiles table
      const { data: profileData } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .maybeSingle();
      
      if (profileData) {
        console.log("Email encontrado na tabela profiles", profileData);
        return true;
      }
      
      // Alternative approach: try to reset password for the email
      // If it returns no error, the email exists
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      });
      
      // If there's no error, it means the email exists
      // If there is an error, it's likely because the email doesn't exist
      const exists = !error;
      console.log("Resultado da verificação de email via reset:", exists);
      
      return exists;
    } catch (err) {
      console.error("Erro ao verificar email:", err);
      return false; // In case of error, allow registration
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
