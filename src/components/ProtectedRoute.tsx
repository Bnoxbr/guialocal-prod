import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/supabaseClient";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "guide" | "tourist";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getCurrentUser();
        if (userData.user) {
          setIsAuthenticated(true);

          // For admin check, we're using a hardcoded email for demo purposes
          // In a real app, you'd check a role field in the user's profile
          if (userData.user.email === "breno@ceo.com") {
            setUserRole("admin");
          } else {
            // Fetch user profile to get role
            // This is a simplified example
            const userEmail = userData.user.email;
            setUserRole(userEmail?.includes("guide") ? "guide" : "tourist");
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
  }, []);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        Carregando...
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role if required
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has required role (if specified)
  return <>{children}</>;
};

export default ProtectedRoute;
