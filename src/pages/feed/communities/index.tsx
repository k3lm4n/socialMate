import Channel from "../../../components/Channel";
import { Outlet } from "react-router-dom";
import ModalAddMembersProvider from "../../../context/ModalAddMembersContext";
import ModalAddMembers from "../../../components/Modals/ModalAddMembers";

export default function ChatPage() {
  return (
    <>
      <ModalAddMembersProvider>
        {/* <TopBar /> */}
        <Channel />
        <div className="bg-chat  lg:w-[calc(100vw-23rem)]  lg:h-[calc(100vh-1.5rem)] md:rounded-none  mt-4 right-0 fixed  bottom-0  w-[calc(100vw-4rem)] max-sm:w-full h-full max-sm:rounded-none  md:mt-4 bg-gray-50 lg:rounded-tl-none   border-l-[1px] border-l-gray-200/80">
          {/* <div className="p-4 h-full"> */}
            <Outlet />
          {/* </div> */}
        </div>
        <ModalAddMembers/>
      </ModalAddMembersProvider>
    </>
  );
}
