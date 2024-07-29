const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const handleSignIn = async (formData) => {
      const res = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      return res;
  };

  export const handleGuestLogin = async (formData) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/guestlogin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return res;
};