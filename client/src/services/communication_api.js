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
    await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
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

export const getMessagesById = async (messageId, token) =>{
    await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
    try {
      const res = await fetch(`/api/messages/getMessages/${messageId}`, {
        method: "GET",
        headers: { authorization: token },
      })
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  
}

export const postReply = async (reply, token, messageId) =>{
  const formData = { reply: reply, token: token};
  await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
  try {
    const res = await fetch(`/api/messages/reply/${messageId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error("Something went wrong");
  }

} 

export const getRepliesByMessageId = async (messageId) =>{
  try {
    const res = await fetch(`/api/messages/threads/${messageId}`, {
      method: "GET",
      headers: { messageId: messageId},
    })
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }

}
