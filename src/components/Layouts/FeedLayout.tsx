import { Outlet } from "react-router-dom";
import ActiveListProvider from "../../context/ActiveListContext";
import ActivePanel from "../ActivePanel";
import ModalCreateChannelProvider from "../../context/ModalCreateChannelContext";
import ModalCreateChannel from "../ModalCreateChannel";
import ModalCreateChat from "../ModalCreateChat";
import ModalCreateChatProvider from "../../context/ModalCreateChatContext";

export default function FeedLayout() {
  return (
    <ActiveListProvider>
      <ModalCreateChannelProvider>
        <ModalCreateChatProvider>
          <div className="bg-gray-300 w-full h-screen">
            <ActivePanel />
            <ModalCreateChannel />
            <ModalCreateChat />

            <Outlet />
          </div>
        </ModalCreateChatProvider>
      </ModalCreateChannelProvider>
    </ActiveListProvider>
  );
}
