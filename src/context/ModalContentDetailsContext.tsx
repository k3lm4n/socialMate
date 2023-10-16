import { PropsWithChildren, createContext, useState } from "react";

export const ModalContentDetailsContext = createContext({} as IContext);

type IContext = {
  isOpen: boolean;
  handle: () => void;
  content: string;
  handleContent: (content: string) => void;
};

export default function ModalContentDetailsProvider({
  children,
}: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setcontent] = useState("");
  function handle() {
    setIsOpen(!isOpen);
  }
  function handleContent(content: string) {
    setcontent(content);
  }

  return (
    <ModalContentDetailsContext.Provider
      value={{ isOpen, handle, content, handleContent }}
    >
      {children}
    </ModalContentDetailsContext.Provider>
  );
}
