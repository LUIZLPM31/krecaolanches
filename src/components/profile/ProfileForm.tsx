import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";

interface ProfileFormProps {
  user: User;
  initialProfile: {
    name: string | null;
    phone: string | null;
  };
  onProfileUpdate: () => Promise<void>;
}

export function ProfileForm({
  user,
  initialProfile,
  onProfileUpdate
}: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(initialProfile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Update profile in the profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          name: profile.name,
          phone: profile.phone,
          updated_at: new Date().toISOString()
        })
        .eq("id", user.id);
        
      if (profileError) throw profileError;

      // Update user metadata to keep consistent data
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { 
          name: profile.name,
          phone: profile.phone 
        }
      });
      
      if (metadataError) throw metadataError;

      // Update session user metadata
      await onProfileUpdate();
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso."
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Falha ao atualizar o perfil: " + error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-300">
            Nome
          </label>
          <Input 
            id="name" 
            name="name" 
            value={profile.name || ""} 
            onChange={handleChange} 
            placeholder="Seu nome" 
            className="border-red-700 bg-gray-600" 
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-gray-300">
            Telefone
          </label>
          <Input 
            id="phone" 
            name="phone" 
            value={profile.phone || ""} 
            onChange={handleChange} 
            placeholder="Seu telefone" 
            className="border-red-700 bg-gray-600" 
          />
        </div>
      </div>
      
      <div className="pt-6 pb-0 flex justify-end">
        <Button 
          type="submit" 
          disabled={loading} 
          className="bg-krecao-yellow text-black hover:bg-amber-500"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin mr-2" />
              Salvando...
            </>
          ) : (
            "Salvar Alterações"
          )}
        </Button>
      </div>
    </form>
  );
}
