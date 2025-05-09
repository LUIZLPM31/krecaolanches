
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthForms } from "@/hooks/useAuthForms";

interface SignUpFormProps {
  onToggleForm: () => void;
  onSuccessfulSignUp: () => void;
}

export default function SignUpForm({ onToggleForm, onSuccessfulSignUp }: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { loading, handleSignUp } = useAuthForms();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSignUp(email, password, name, phone);
    if (success) {
      onSuccessfulSignUp();
    }
  };

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Criar Conta</h2>
        <p className="text-gray-400">
          Crie sua conta para fazer pedidos
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

          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
              required
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(51) 99999-9999"
              required
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-krecao-red hover:bg-krecao-red/90"
            disabled={loading}
          >
            {loading ? "Carregando..." : "Criar Conta"}
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onToggleForm}
          className="text-krecao-yellow hover:underline text-sm"
        >
          Já tem uma conta? Entre aqui
        </button>
      </div>
    </>
  );
}
