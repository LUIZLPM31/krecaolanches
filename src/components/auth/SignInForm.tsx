
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthForms } from "@/hooks/useAuthForms";

interface SignInFormProps {
  onToggleForm: () => void;
}

export default function SignInForm({ onToggleForm }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, handleSignIn } = useAuthForms();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignIn(email, password);
  };

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Entrar</h2>
        <p className="text-gray-400">
          Entre com sua conta para acessar seus pedidos
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@email.com"
              required
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-krecao-red hover:bg-krecao-red/90"
            disabled={loading}
          >
            {loading ? "Carregando..." : "Entrar"}
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onToggleForm}
          className="text-krecao-yellow hover:underline text-sm"
        >
          Não tem uma conta? Cadastre-se
        </button>
      </div>
    </>
  );
}
