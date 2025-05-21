
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, User, Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface ProfileAvatarProps {
  user: SupabaseUser;
  avatarUrl: string | null;
  onAvatarUpdate: (url: string) => void;
}

export function ProfileAvatar({ user, avatarUrl, onAvatarUpdate }: ProfileAvatarProps) {
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}-${Math.random()}.${fileExt}`;

    setUploadLoading(true);

    try {
      // Upload image to storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      
      // Update profile with avatar URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ 
          avatar_url: data.publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      // Update local state via callback
      onAvatarUpdate(data.publicUrl);
      
      toast({
        title: "Foto de perfil atualizada",
        description: "Sua foto de perfil foi atualizada com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Falha ao enviar a imagem: " + error.message,
        variant: "destructive",
      });
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div className="relative mb-4">
      <Avatar className="w-24 h-24 border-2 border-krecao-yellow">
        {avatarUrl ? (
          <AvatarImage src={avatarUrl} alt="Avatar do usuário" />
        ) : (
          <AvatarFallback className="bg-gray-700 text-white text-lg">
            <User size={32} />
          </AvatarFallback>
        )}
      </Avatar>
      
      <label 
        htmlFor="avatar-upload" 
        className="absolute bottom-0 right-0 bg-krecao-yellow p-2 rounded-full cursor-pointer hover:bg-amber-500 transition-colors"
      >
        {uploadLoading ? (
          <Loader2 size={16} className="animate-spin text-black" />
        ) : (
          <Camera size={16} className="text-black" />
        )}
      </label>
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        disabled={uploadLoading}
      />
    </div>
  );
}
