import { PropsWithChildren, createContext, useState } from "react";

export const ModalAddSubCourseContext = createContext({} as IContext);

type IContext = {
  isOpen: boolean;
  handle: () => void;
};

export default function ModalAddSubCourseProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  function handle() {
    setIsOpen(!isOpen);
  }

  return (
    <ModalAddSubCourseContext.Provider value={{ isOpen, handle }}>
      {children}
    </ModalAddSubCourseContext.Provider>
  );
}
