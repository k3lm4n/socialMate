import Channel from "../../../components/Channel";

import TopBar from "../../../components/TopBar";
import { Outlet } from "react-router-dom";

export default function ChatPage() {
  return (
    <>
      <TopBar />
      <Channel />
      <div className="bg-chat  lg:w-[calc(100vw-23rem)]  lg:h-[calc(100vh-4.7rem)]  md:h-[calc(100vh-3.7rem)]  md:rounded-none  mt-4 right-0 fixed  bottom-0  w-[calc(100vw-4rem)] max-sm:w-full h-full max-sm:rounded-none  md:mt-4 bg-gray-50 lg:rounded-tl-none   border-l-[1px] border-l-gray-200/80">
        <div className="p-4 h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
