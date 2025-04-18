import supabase from "./supabase";

// Password strength validation
export const validatePassword = (
  password: string,
): { valid: boolean; message: string } => {
  if (password.length < 8) {
    return {
      valid: false,
      message: "A senha deve ter pelo menos 8 caracteres",
    };
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: "A senha deve conter pelo menos uma letra maiúscula",
    };
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      message: "A senha deve conter pelo menos uma letra minúscula",
    };
  }

  // Check for at least one number
  if (!/[0-9]/.test(password)) {
    return {
      valid: false,
      message: "A senha deve conter pelo menos um número",
    };
  }

  // Check for at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      valid: false,
      message: "A senha deve conter pelo menos um caractere especial",
    };
  }

  return { valid: true, message: "Senha válida" };
};

export const registerTourist = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new Error("Formato de email inválido");
    }

    // Validate password strength
    const passwordCheck = validatePassword(data.password);
    if (!passwordCheck.valid) {
      throw new Error(passwordCheck.message);
    }

    // 1. Create auth user with sanitized inputs
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email.trim().toLowerCase(),
      password: data.password,
      options: {
        data: {
          name: data.name.trim(),
          user_type: "tourist",
        },
      },
    });

    if (authError) throw authError;

    // 2. Create user profile
    const { error: profileError } = await supabase.from("users").insert({
      id: authData.user?.id,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      type: "tourist",
    });

    if (profileError) throw profileError;

    return authData;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const registerGuide = async (data: {
  name: string;
  email: string;
  password: string;
  location: string;
  languages: string[];
  specialties: string[];
  cadastur_number: string;
  social_links: {
    tripadvisor?: string;
    instagram?: string;
  };
}) => {
  try {
    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new Error("Formato de email inválido");
    }

    // Validate password strength
    const passwordCheck = validatePassword(data.password);
    if (!passwordCheck.valid) {
      throw new Error(passwordCheck.message);
    }

    // Validate Cadastur number (assuming it should be alphanumeric and at least 6 chars)
    if (!/^[a-zA-Z0-9]{6,}$/.test(data.cadastur_number)) {
      throw new Error("Número do Cadastur inválido");
    }

    // Sanitize social links
    const sanitizedSocialLinks = {
      tripadvisor: data.social_links.tripadvisor
        ? data.social_links.tripadvisor.trim()
        : undefined,
      instagram: data.social_links.instagram
        ? data.social_links.instagram.trim()
        : undefined,
    };

    // 1. Create auth user with metadata
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email.trim().toLowerCase(),
      password: data.password,
      options: {
        data: {
          name: data.name.trim(),
          user_type: "guide",
          cadastur_number: data.cadastur_number,
        },
      },
    });

    if (authError) throw authError;

    // 2. Create user profile
    const { error: profileError } = await supabase.from("users").insert({
      id: authData.user?.id,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      type: "guide",
    });

    if (profileError) throw profileError;

    // 3. Create guide profile
    const { error: guideError } = await supabase.from("guides").insert({
      user_id: authData.user?.id,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      location: data.location,
      languages: data.languages,
      specialties: data.specialties,
      cadastur_number: data.cadastur_number,
      social_links: sanitizedSocialLinks,
      rating: 5.0,
    });

    if (guideError) throw guideError;

    return authData;
  } catch (error) {
    console.error("Guide registration error:", error);
    throw error;
  }
};

// Function to request password reset
export const requestPasswordReset = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      {
        redirectTo: `${window.location.origin}/reset-password`,
      },
    );

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Password reset request error:", error);
    throw error;
  }
};

// Function to update password
export const updatePassword = async (newPassword: string) => {
  try {
    // Validate password strength
    const passwordCheck = validatePassword(newPassword);
    if (!passwordCheck.valid) {
      throw new Error(passwordCheck.message);
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Password update error:", error);
    throw error;
  }
};
