const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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
    const res = await fetch(`${API_BASE_URL}/api/messages/send`, {
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
    const res = await fetch(`${API_BASE_URL}/api/messages/getMessages`, {
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
  try {
    const res = await fetch(`${API_BASE_URL}/api/messages/getMessages/${messageId}`, {
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
  try {
    const res = await fetch(`${API_BASE_URL}/api/messages/reply/${messageId}`, {
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
    const res = await fetch(`${API_BASE_URL}/api/messages/threads/${messageId}`, {
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
    const res = await fetch(`${API_BASE_URL}/api/messages/editMessage/${messageId}`, {
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
    const res = await fetch(`${API_BASE_URL}/api/messages/editReply/${messageId}`, {
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


export const markAsRead = async (token, messageId) => {
  const formData = { token: token };
  try {
    const res = await fetch(`${API_BASE_URL}/api/messages/markRead/${messageId}`, {
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

export const markReplyAsRead = async (replyId, messageId, token) => {
  const formData = { token: token, messageId: messageId, replyId: replyId};
  try {
    const res = await fetch(`${API_BASE_URL}/api/messages/markReplyRead`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
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


export async function getUnreadRepliesCount(token, userId, messageId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/messages/getUnreadReplies/${messageId}`, {
      method: "GET",
      headers: { authorization: token, userid : userId },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
