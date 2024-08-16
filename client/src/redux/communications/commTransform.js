// src/features/comm/commTransform.js
import { createTransform } from "redux-persist";

const resetNewMessageTransform = createTransform(
  (inboundState) => {
    return { ...inboundState, newMessage: "" };
  },
  (outboundState) => {
    return { ...outboundState, newMessage: "" };
  },
  { whitelist: ["comm"] }
);

export default resetNewMessageTransform;
