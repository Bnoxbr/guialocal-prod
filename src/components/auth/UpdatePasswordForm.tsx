import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";
import { updatePassword, validatePassword } from "@/lib/auth";
import { useToast } from "../ui/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export const UpdatePasswordForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  // Check if user is authenticated via recovery token
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        toast({
          title: "Acesso não autorizado",
          description:
            "Você precisa acessar esta página através de um link de redefinição de senha.",
          variant: "destructive",
        });
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate, toast]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { password: "", confirmPassword: "" };

    // Password validation
    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid) {
      newErrors.password = passwordCheck.message;
      valid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await updatePassword(password);
      setPasswordUpdated(true);
      toast({
        title: "Senha atualizada",
        description: "Sua senha foi atualizada com sucesso!",
      });
    } catch (error: any) {
      console.error("Password update error:", error);
      toast({
        title: "Erro ao atualizar senha",
        description: error.message || "Não foi possível atualizar sua senha.",
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
            {passwordUpdated ? "Senha Atualizada" : "Criar Nova Senha"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {passwordUpdated ? (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Sua senha foi atualizada com sucesso.
              </p>
              <Button
                className="w-full mt-4"
                onClick={() => navigate("/login")}
              >
                Ir para o Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Nova Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors({ ...errors, password: "" });
                    }}
                    className={
                      errors.password ? "border-red-500 pr-10" : "pr-10"
                    }
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  A senha deve ter pelo menos 8 caracteres, incluindo letras
                  maiúsculas, minúsculas, números e caracteres especiais.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword)
                        setErrors({ ...errors, confirmPassword: "" });
                    }}
                    className={
                      errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"
                    }
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Atualizando..." : "Atualizar Senha"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatePasswordForm;
