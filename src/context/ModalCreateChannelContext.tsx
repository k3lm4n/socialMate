import { PropsWithChildren, createContext, useState } from "react";

export const ModalCreateChannelContext = createContext({} as IContext);

type IContext = {
  isOpen: boolean;
  handle: () => void;
};

export default function ModalCreateChannelProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  function handle() {
    setIsOpen(!isOpen);
  }

  return (
    <ModalCreateChannelContext.Provider value={{ isOpen, handle }}>
      {children}
    </ModalCreateChannelContext.Provider>
  );
}
