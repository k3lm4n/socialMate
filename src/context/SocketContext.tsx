import { Message } from "../utils/types/@types";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import io from "socket.io-client";

// export const socket = io("https://api.oowl.tech");
export const socket = io(import.meta.env.VITE_SOCKET_URL);
export const SocketContext = createContext({} as IContext);

type SetRoomType = {
  senderId: string;
  chatId: string | undefined;
  socketId: string | undefined;
};

type IContext = {
  setRoom: (room: SetRoomType) => void;
  sendMessage: (message: Message) => void;
  messages: Message[];
};

export default function SocketProvider({ children }: PropsWithChildren) {
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    // getMessages();
   
  }, []);

  function setRoom(room: SetRoomType) {
    socket.emit("connectedOn", room, (msg: Message) => {
      setMessages(msg as any);
    });
  }

  function sendMessage(message: Message) {
    socket.emit("createdMessage", message);
  }

  // function getMessages() {
  //   socket.on("newIncomingMessage", (msg: Message) => {
  //     setMessages((prev) => [...prev, msg]);
  //   });
  // }

  return (
    <SocketContext.Provider value={{ sendMessage, messages, setRoom }}>
      {children}
    </SocketContext.Provider>
  );
}
