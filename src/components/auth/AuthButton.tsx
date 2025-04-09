import { Button } from "../ui/button";
import { UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase, signOut } from "@/lib/supabaseClient";

export const AuthButton = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setIsAuthenticated(true);

          // Get user profile to determine role
          const { data: userData } = await supabase
            .from("users")
            .select("type")
            .eq("id", data.session.user.id)
            .single();

          setUserRole(userData?.type || null);
        } else {
          setIsAuthenticated(false);
          setUserRole(null);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setIsAuthenticated(true);

          // Get user profile to determine role
          const { data: userData } = await supabase
            .from("users")
            .select("type")
            .eq("id", session.user.id)
            .single();

          setUserRole(userData?.type || null);
        } else {
          setIsAuthenticated(false);
          setUserRole(null);
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 text-white hover:text-white hover:bg-white/20"
        disabled
      >
        <UserCircle className="w-5 h-5" />
        Carregando...
      </Button>
    );
  }

  if (!isAuthenticated) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 text-white hover:text-white hover:bg-white/20"
        onClick={() => navigate("/login")}
      >
        <UserCircle className="w-5 h-5" />
        Entrar
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-white hover:text-white hover:bg-white/20"
        >
          <UserCircle className="w-5 h-5" />
          Minha Conta
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {userRole === "guide" && (
          <DropdownMenuItem onClick={() => navigate("/dashboard")}>
            Meu Painel
          </DropdownMenuItem>
        )}
        {userRole === "admin" && (
          <DropdownMenuItem onClick={() => navigate("/admin")}>
            Painel Admin
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => navigate("/reservas")}>
          Minhas Reservas
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/perfil")}>
          Meu Perfil
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
