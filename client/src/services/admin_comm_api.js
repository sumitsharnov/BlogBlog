const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const getUsersCommunicated = async (token) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/comm/commUsers?token=${encodeURIComponent(token)}`, {
        method: "GET",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };
  