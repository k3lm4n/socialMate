import Chats from "../../../components/Chats";

import { Outlet } from "react-router-dom";

export default function ChatPageContacts() {
  return (
    <>
      <Chats />
      <div className="bg-chat  lg:w-[calc(100vw-21rem)]  lg:h-[calc(100vh-1.5rem)] md:h-[calc(100vh-3.7rem)]  md:rounded-none  mt-4 right-0 fixed  bottom-0  w-[calc(100vw-4rem)] max-sm:w-full h-full max-sm:rounded-none  md:mt-4 bg-gray-50 lg:rounded-tl-none   border-l-[1px] border-l-gray-200/80">
        <div className="h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
