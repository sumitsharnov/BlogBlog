export async function postMessage(userId, token, message) {
  const formData = { userId: userId, token: token, message: message };
  try {
    const res = await fetch("/api/messages/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
}

export const getMessages = async (userId, token) =>{
    try {
      const res = await fetch("/api/messages/getMessages", {
        method: "GET",
        headers: { userId: userId, authorization: token },
      })
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Something went wrong");
    }
  
}
