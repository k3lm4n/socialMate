import { PropsWithChildren, createContext, useState } from "react";

export const ModalAddMembersContext = createContext({} as IContext);

type IContext = {
  isOpen: boolean;
  handle: () => void;
};

export default function ModalAddMembersProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  function handle() {
    setIsOpen(!isOpen);
  }

  return (
    <ModalAddMembersContext.Provider value={{ isOpen, handle }}>
      {children}
    </ModalAddMembersContext.Provider>
  );
}
