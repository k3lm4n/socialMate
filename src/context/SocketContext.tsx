import { Message } from "../utils/types/@types";
import { PropsWithChildren, createContext, useState, useEffect } from "react";
import io from "socket.io-client";

// export const socket = io("https://api.oowl.tech");
export const socket = io(import.meta.env.VITE_SOCKET_URL, {
  withCredentials: true,
});
export const SocketContext = createContext({} as IContext);

type SetRoomType = {
  senderId: string;
  chatId: string | undefined;
  socketId: string | undefined;
};

type IContext = {
  setRoom: (room: SetRoomType) => void;
  // sendMessage: (message: Message) => void;
  messages: Message[];
  populateMessages: (msg: Message[]) => void;
  getMessages: () => void;
};

export default function SocketProvider({ children }: PropsWithChildren) {
  const [messages, setMessages] = useState<Array<Message>>([]);

  function setRoom(room: SetRoomType) {
    socket.emit("connectedOn", room, (msg: Message) => {
      setMessages(msg as any);
    });
  }

  function populateMessages(msg: Message[]) {
    setMessages(msg);
  }

  useEffect(() => {
    getMessages();
  }, [socket]);

  // function sendMessage(message: Message) {
  //   socket.emit("createdMessage", message);
  // }

  function getMessages() {
    socket.on("newIncomingMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });
  }

  return (
    <SocketContext.Provider
      value={{ messages, setRoom, getMessages, populateMessages }}
    >
      {children}
    </SocketContext.Provider>
  );
}
