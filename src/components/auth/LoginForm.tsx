import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { signIn, supabase } from "@/lib/supabaseClient";
import { useToast } from "../ui/use-toast";
import { Eye, EyeOff } from "lucide-react";

export const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Check if there's a redirect URL in the query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirectTo = params.get("redirectTo");
    if (redirectTo) {
      // Store the redirect URL to use after successful login
      sessionStorage.setItem("authRedirect", redirectTo);
    }
  }, [location]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
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
      const data = await signIn(formData.email, formData.password);

      toast({
        title: "Login bem-sucedido",
        description: "Você foi autenticado com sucesso!",
      });

      // Check for redirect URL from session storage
      const redirectUrl = sessionStorage.getItem("authRedirect");
      if (redirectUrl) {
        sessionStorage.removeItem("authRedirect");
        navigate(redirectUrl);
        return;
      }

      // Redirect based on user role
      if (data.user?.email === "breno@ceo.com") {
        navigate("/admin");
      } else {
        // Check if user is a guide
        const { data: userData } = await supabase
          .from("users")
          .select("type")
          .eq("id", data.user?.id)
          .single();

        if (userData?.type === "guide") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Erro ao fazer login",
        description:
          error.message || "Verifique suas credenciais e tente novamente.",
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
          <CardTitle className="text-2xl text-center">Entrar</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                className={errors.email ? "border-red-500" : ""}
                required
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
                  className={errors.password ? "border-red-500 pr-10" : "pr-10"}
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
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>

            <div className="text-center space-y-2">
              <Button
                variant="link"
                className="text-sm text-muted-foreground"
                onClick={() => navigate("/forgot-password")}
                disabled={isLoading}
              >
                Esqueceu sua senha?
              </Button>

              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  Não tem uma conta?
                </span>
                <Button
                  variant="link"
                  className="text-sm"
                  onClick={() => navigate("/register")}
                  disabled={isLoading}
                >
                  Registre-se
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
