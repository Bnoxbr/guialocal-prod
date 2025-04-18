import { useState } from "react";
import { Button } from "../ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "../ui/use-toast";

interface TestLoginButtonProps {
  email?: string;
  password?: string;
}

const TestLoginButton = ({
  email = "test@example.com",
  password = "password123",
}: TestLoginButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTestLogin = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login successful",
          description: `Logged in as ${email}`,
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleTestLogin}
      disabled={isLoading}
      variant="outline"
      className="w-full"
    >
      {isLoading ? "Logging in..." : `Login as ${email}`}
    </Button>
  );
};

export default TestLoginButton;
