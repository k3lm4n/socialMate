import { PropsWithChildren, createContext, useState } from "react";

export const ModalCreatePostContext = createContext({} as IContext);

type IContext = {
  isOpen: boolean;
  handle: () => void;
};

export default function ModalCreatePostProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  function handle() {
    setIsOpen(!isOpen);
  }

  return (
    <ModalCreatePostContext.Provider value={{ isOpen, handle }}>
      {children}
    </ModalCreatePostContext.Provider>
  );
}
