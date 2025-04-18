import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset } from "@/lib/auth";
import { useToast } from "../ui/use-toast";

export const PasswordResetForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    if (!email) {
      setError("Email é obrigatório");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email inválido");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    setIsLoading(true);

    try {
      await requestPasswordReset(email);
      setEmailSent(true);
      toast({
        title: "Email enviado",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast({
        title: "Erro ao enviar email",
        description:
          error.message ||
          "Não foi possível enviar o email de redefinição de senha.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            {emailSent ? "Email Enviado" : "Redefinir Senha"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {emailSent ? (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Enviamos um email para <strong>{email}</strong> com instruções
                para redefinir sua senha.
              </p>
              <p className="text-muted-foreground">
                Verifique sua caixa de entrada e siga as instruções no email.
              </p>
              <Button
                className="w-full mt-4"
                onClick={() => navigate("/login")}
              >
                Voltar para o Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  className={error ? "border-red-500" : ""}
                  required
                  disabled={isLoading}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar Email de Redefinição"}
              </Button>

              <div className="text-center">
                <Button
                  variant="link"
                  className="text-sm"
                  onClick={() => navigate("/login")}
                  disabled={isLoading}
                >
                  Voltar para o Login
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordResetForm;
