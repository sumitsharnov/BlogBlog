const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const getUserInfo = async (userId, token) => {
  const formData = {"userId": userId, "token": token}
    const response = await fetch(`${API_BASE_URL}/api/user/userDetails`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response;
  };

  export const updateUserRecruiter = async (userId, token, isRecruiter) => {
    const formData = {"userId": userId, "token": token, "isRecruiter": isRecruiter}
      const response = await fetch(`${API_BASE_URL}/api/user/updateRecruiter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response;
    };