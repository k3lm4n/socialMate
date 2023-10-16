import { PropsWithChildren, createContext, useState } from "react";

export const ModalAddCourseContext = createContext({} as IContext);

type IContext = {
  isOpen: boolean;
  handle: () => void;
};

export default function ModalAddCourseProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  function handle() {
    setIsOpen(!isOpen);
  }

  return (
    <ModalAddCourseContext.Provider value={{ isOpen, handle }}>
      {children}
    </ModalAddCourseContext.Provider>
  );
}
