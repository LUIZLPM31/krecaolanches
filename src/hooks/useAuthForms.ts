
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

  // Função simplificada para verificar a existência de email
  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      // Consulta direta na tabela de perfis
      const { data: profileData } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .maybeSingle();
        
      if (profileData) {
        console.log("Email encontrado na tabela profiles", profileData);
        return true;
      }
      
      // Consulta para verificar usuários existentes pelo email na auth
      const { data, error } = await supabase.auth.admin.listUsers({
        filters: {
          email: email
        }
      });
      
      // Se houver erro na API admin ou não tivermos acesso, assumimos que o email não existe
      if (error) {
        console.log("Erro ao verificar usuários:", error);
        return false;
      }
      
      // Verifica se encontrou algum usuário com esse email
      const exists = data && data.users && data.users.length > 0;
      console.log("Resultado da verificação de email:", exists);
      
      return exists;
    } catch (err) {
      console.error("Erro ao verificar email:", err);
      return false; // Em caso de erro, permitir o cadastro
    }
  };

  const handleSignUp = async (email: string, password: string, name: string, phone: string) => {
    setLoading(true);

    try {
      // Desativando temporariamente a verificação de email para debug
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
