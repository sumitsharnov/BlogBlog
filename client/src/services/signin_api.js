export const handleSignIn = async (formData) => {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      return res;
  };

  export const handleGuestLogin = async (formData) => {
    const res = await fetch("/api/auth/guestlogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return res;
};