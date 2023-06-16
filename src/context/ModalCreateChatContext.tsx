import { PropsWithChildren, createContext, useState } from "react";

export const ModalCreateChatContext = createContext({} as IContext);

type IContext = {
  isOpen: boolean;
  handle: () => void;
};

export default function ModalCreateChatProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  function handle() {
    setIsOpen(!isOpen);
  }

  return (
    <ModalCreateChatContext.Provider value={{ isOpen, handle }}>
      {children}
    </ModalCreateChatContext.Provider>
  );
}
