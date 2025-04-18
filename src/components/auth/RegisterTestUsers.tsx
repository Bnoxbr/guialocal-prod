import { useState } from "react";
import { Button } from "../ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "../ui/use-toast";

interface RegisterTestUsersProps {
  showMessage?: boolean;
}

const RegisterTestUsers = ({ showMessage = true }: RegisterTestUsersProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRegisterTestUsers = async () => {
    setIsLoading(true);
    try {
      // This would typically call a secure backend endpoint or Supabase Edge Function
      // that would handle the registration of test users
      // For demo purposes, we'll just show a success message

      if (showMessage) {
        toast({
          title: "Test users registration",
          description:
            "This would register test users in a real implementation",
          duration: 5000,
        });
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleRegisterTestUsers}
      disabled={isLoading}
      variant="secondary"
      className="w-full"
    >
      {isLoading ? "Registering..." : "Register Test Users"}
    </Button>
  );
};

export default RegisterTestUsers;
