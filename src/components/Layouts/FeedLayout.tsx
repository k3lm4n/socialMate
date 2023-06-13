import { Outlet } from "react-router-dom";
import ActiveListProvider from "../../context/ActiveListContext";
import ActivePanel from "../ActivePanel";
import ModalCreateChannelProvider from "../../context/ModalCreateChannelContext";
import ModalCreateChannel from "../ModalCreateChannel";

export const FeedLayout = () => {
  return (
    <ActiveListProvider>
      <ModalCreateChannelProvider>
        <div className="bg-gray-300 w-full h-screen">
          <ActivePanel />
          <ModalCreateChannel/>
          <Outlet />
        </div>
      </ModalCreateChannelProvider>
    </ActiveListProvider>
  );
};
