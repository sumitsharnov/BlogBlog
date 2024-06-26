export async function postMessage(
  communicationUserId,
  currentUserId,
  token,
  message
) {
  const formData = {
    communicationUserId: communicationUserId,
    currentUserId: currentUserId,
    token: token,
    message: message,
  };
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

export const getMessages = async (userId, token) => {
  try {
    const res = await fetch("/api/messages/getMessages", {
      method: "GET",
      headers: { userId: userId, authorization: token },
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
};

export const getMessagesById = async (messageId, token) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  try {
    const res = await fetch(`/api/messages/getMessages/${messageId}`, {
      method: "GET",
      headers: { authorization: token },
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

export const postReply = async (reply, token, messageId, userId) => {
  const formData = { reply: reply, token: token, userId: userId };
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  try {
    const res = await fetch(`/api/messages/reply/${messageId}`, {
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
    throw new Error("Something went wrong");
  }
};

export const getRepliesByMessageId = async (messageId) => {
  try {
    const res = await fetch(`/api/messages/threads/${messageId}`, {
      method: "GET",
      headers: { messageId: messageId },
    });
    const data = await res.json();
    await data;
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postEditMessage = async (messageId, token, editedText) => {
  const formData = { editedText: editedText, token: token };
  try {
    const res = await fetch(`/api/messages/editMessage/${messageId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", messageId: messageId },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postEditReply = async (replyId, token, editedText, messageId) => {
  const formData = { editedText: editedText, token: token, replyId: replyId };
  try {
    const res = await fetch(`/api/messages/editReply/${messageId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", messageId: messageId },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
