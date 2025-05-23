
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { OrderHistory } from "@/components/profile/OrderHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserIcon, PackageIcon } from "lucide-react";

const UserProfile = () => {
  const { user, refreshSession } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");
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
    fetchProfile();
  }, [user, navigate]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      // Using maybeSingle instead of single to prevent errors when no data is found
      const { data, error } = await supabase
        .from("profiles")
        .select("name, phone, avatar_url")
        .eq("id", user!.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile({
          name: data.name || user!.user_metadata?.name || "",
          phone: data.phone || user!.user_metadata?.phone || "",
          avatar_url: data.avatar_url || null,
        });
      } else {
        // If no profile found, use metadata from user object
        setProfile({
          name: user!.user_metadata?.name || "",
          phone: user!.user_metadata?.phone || "",
          avatar_url: null,
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

  const handleAvatarUpdate = (url: string) => {
    setProfile(prev => ({
      ...prev,
      avatar_url: url
    }));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-8 text-center">Perfil do Usuário</h1>
        
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as "profile" | "orders")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <PackageIcon className="h-4 w-4" />
              Pedidos
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card className="bg-gray-900 border-gray-800">
              <ProfileCard 
                user={user} 
                profile={profile}
                onProfileUpdate={refreshSession}
                onAvatarUpdate={handleAvatarUpdate}
              />
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <OrderHistory />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
