import { Outlet } from "react-router-dom";
import ActiveListProvider from "../../context/ActiveListContext";
import ActivePanel from "../ActivePanel";
import ModalCreateChannelProvider from "../../context/ModalCreateChannelContext";
import ModalCreateChannel from "../Modals/ModalCreateChannel";
import ModalCreateChat from "../Modals/ModalCreateChat";
import ModalCreateChatProvider from "../../context/ModalCreateChatContext";
import ModalCreatePostProvider from "../../context/ModalCreatePostContext";
import ModalCreatePost from "../Modals/ModalCreatePost";

export default function FeedLayout() {
  return (
    <ActiveListProvider>
      <ModalCreateChannelProvider>
        <ModalCreateChatProvider>
          <ModalCreatePostProvider>
            <div className="bg-gray-300 w-full h-screen">
              <ActivePanel />
              <ModalCreateChannel />
              <ModalCreateChat />
              <ModalCreatePost />
              <Outlet />
            </div>
          </ModalCreatePostProvider>
        </ModalCreateChatProvider>
      </ModalCreateChannelProvider>
    </ActiveListProvider>
  );
}
