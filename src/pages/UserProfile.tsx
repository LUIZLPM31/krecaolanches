
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Loader2, User, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, session, refreshSession } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [profile, setProfile] = useState<{
    name: string | null;
    phone: string | null;
    avatar_url: string | null;
  }>({
    name: "",
    phone: "",
    avatar_url: null,
  });

  useEffect(() => {
    // Redirect if user is not logged in
    if (!user) {
      navigate("/auth");
      return;
    }
    
    // Fetch user profile
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("name, phone, avatar_url")
          .eq("id", user.id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setProfile({
            name: data.name || user.user_metadata.name || "",
            phone: data.phone || user.user_metadata.phone || "",
            avatar_url: data.avatar_url,
          });
        }
      } catch (error: any) {
        toast({
          title: "Erro",
          description: "Falha ao carregar o perfil: " + error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          name: profile.name,
          phone: profile.phone,
          updated_at: new Date(),
        })
        .eq("id", user!.id);

      if (error) throw error;
      
      // Update session user metadata
      await refreshSession();
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Falha ao atualizar o perfil: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${user!.id}-${Math.random()}.${fileExt}`;

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
        .update({ avatar_url: data.publicUrl })
        .eq("id", user!.id);

      if (updateError) throw updateError;

      // Update local state
      setProfile({
        ...profile,
        avatar_url: data.publicUrl,
      });
      
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

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-8 text-center">Perfil do Usuário</h1>
        
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-col items-center">
              <CardTitle className="text-xl text-white mb-6">Informações Pessoais</CardTitle>
              
              <div className="relative mb-4">
                <Avatar className="w-24 h-24 border-2 border-krecao-yellow">
                  {profile.avatar_url ? (
                    <AvatarImage src={profile.avatar_url} alt={profile.name || ""} />
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
              
              <p className="text-gray-400">
                {user.email}
              </p>
            </CardHeader>
            
            <CardContent>
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
                      className="bg-gray-800 border-gray-700"
                      placeholder="Seu nome"
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
                      className="bg-gray-800 border-gray-700"
                      placeholder="Seu telefone"
                    />
                  </div>
                </div>
                
                <CardFooter className="px-0 pt-6 pb-0 flex justify-end">
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
                    ) : "Salvar Alterações"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
