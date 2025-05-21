
import { CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileForm } from "./ProfileForm";
import { User } from "@supabase/supabase-js";

interface ProfileCardProps {
  user: User;
  profile: {
    name: string | null;
    phone: string | null;
    avatar_url: string | null;
  };
  onProfileUpdate: () => Promise<void>;
  onAvatarUpdate: (url: string) => void;
}

export function ProfileCard({ user, profile, onProfileUpdate, onAvatarUpdate }: ProfileCardProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-xl text-white mb-6">Informações Pessoais</CardTitle>
        
        <ProfileAvatar 
          user={user} 
          avatarUrl={profile.avatar_url}
          onAvatarUpdate={onAvatarUpdate}
        />
        
        <p className="text-gray-400">
          {user.email}
        </p>
      </CardHeader>
      
      <CardContent>
        <ProfileForm 
          user={user}
          initialProfile={{ name: profile.name, phone: profile.phone }}
          onProfileUpdate={onProfileUpdate}
        />
      </CardContent>
    </div>
  );
}
