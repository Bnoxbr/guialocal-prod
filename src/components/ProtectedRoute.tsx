import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase, refreshSession } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "guide" | "tourist";
}

// Admin emails list for easy maintenance
const ADMIN_EMAILS = ["breno@ceo.com", "admin@localguia.com"];

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get current session
        const { data: sessionData } = await supabase.auth.getSession();

        if (sessionData.session) {
          setIsAuthenticated(true);
          const userId = sessionData.session.user.id;
          const userEmail = sessionData.session.user.email;

          // Check if user is an admin based on email
          if (ADMIN_EMAILS.includes(userEmail || "")) {
            setUserRole("admin");
          } else {
            // Fetch user profile to get role from database
            const { data: userData, error } = await supabase
              .from("users")
              .select("type")
              .eq("id", userId)
              .single();

            if (error) {
              console.error("Error fetching user role:", error);
              setUserRole("tourist"); // Default role
            } else {
              setUserRole(userData.type);
            }
          }
        } else {
          setIsAuthenticated(false);
          setUserRole(null);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
        setUserRole(null);
      }
    };

    checkAuth();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setIsAuthenticated(true);
          const userId = session.user.id;
          const userEmail = session.user.email;

          // Check if user is an admin based on email
          if (ADMIN_EMAILS.includes(userEmail || "")) {
            setUserRole("admin");
          } else {
            // Fetch user profile to get role from database
            const { data: userData, error } = await supabase
              .from("users")
              .select("type")
              .eq("id", userId)
              .single();

            if (error) {
              console.error("Error fetching user role:", error);
              setUserRole("tourist"); // Default role
            } else {
              setUserRole(userData.type);
            }
          }
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

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        <span className="ml-2">Carregando...</span>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Pass the current location to redirect back after login
    return (
      <Navigate
        to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  // Check role if required
  if (requiredRole && userRole !== requiredRole) {
    toast({
      title: "Acesso negado",
      description: `Você precisa ser um ${requiredRole === "admin" ? "administrador" : requiredRole === "guide" ? "guia" : "turista"} para acessar esta página.`,
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has required role (if specified)
  return <>{children}</>;
};

export default ProtectedRoute;
