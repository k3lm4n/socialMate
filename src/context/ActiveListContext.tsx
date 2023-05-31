import { PropsWithChildren, createContext, useState } from "react";

export const ActiveListContext = createContext({} as IContext);

type IContext = {
  isOpen: boolean;
  handle: () => void;
};

export default function ActiveListProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  function handle() {
    setIsOpen(!isOpen);
  }

  return (
    <ActiveListContext.Provider value={{ isOpen, handle }}>
      {children}
    </ActiveListContext.Provider>
  );
}
