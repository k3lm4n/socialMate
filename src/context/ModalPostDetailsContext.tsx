import { PropsWithChildren, createContext, useState } from "react";

export const ModalPostDetailsContext = createContext({} as IContext);

type IContext = {
  isOpen: boolean;
  handle: () => void;
  post: string;
  handlePost: (post: string) => void;
};

export default function ModalPostDetailsProvider({
  children,
}: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState("");
  function handle() {
    setIsOpen(!isOpen);
  }
  function handlePost(post: string) {
    setPost(post);
  }

  return (
    <ModalPostDetailsContext.Provider
      value={{ isOpen, handle, post, handlePost }}
    >
      {children}
    </ModalPostDetailsContext.Provider>
  );
}
