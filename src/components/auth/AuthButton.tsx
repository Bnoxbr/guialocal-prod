import { Button } from "../ui/button";
import { UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export const AuthButton = () => {
  const navigate = useNavigate();
  const isAuthenticated = false; // Replace with actual auth state

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
        <DropdownMenuItem onClick={() => navigate("/dashboard")}>
          Meu Painel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/bookings")}>
          Minhas Reservas
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          Meu Perfil
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            /* Implement logout */
          }}
        >
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
