export const getUserInfo = async (userId, token) => {
  const formData = {"userId": userId, "token": token}
    const response = await fetch("/api/user/userDetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response;
  };