export const getUsersCommunicated = async (token) => {
    try {
      const res = await fetch(`/api/admin/comm/commUsers?token=${encodeURIComponent(token)}`, {
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
  