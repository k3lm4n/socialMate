import { Outlet } from "react-router-dom";
import ActiveListProvider from "../../context/ActiveListContext";
import Sidebar from "../Sidebar";
import ModalCreateChannelProvider from "../../context/ModalCreateChannelContext";
import ModalCreatePostProvider from "../../context/ModalCreatePostContext";
import ModalCreateChatProvider from "../../context/ModalCreateChatContext";
import ModalContentDetailsProvider from "../../context/ModalContentDetailsContext";
import ModalPostDetailsProvider from "../../context/ModalPostDetailsContext";
import ActivePanel from "../ActivePanel";
import ModalCreateChannel from "../Modals/ModalCreateChannel";
import ModalCreatePost from "../Modals/ModalCreatePost";
import ModalCreateChat from "../Modals/ModalCreateChat";
import ModalPostDetails from "../Modals/ModalPostDetails";
import ModelContentDetails from "../Modals/ModalContentDetails";

export default function DashboardLayout() {
  return (
    <ActiveListProvider>
      <ModalCreateChannelProvider>
        <ModalCreateChatProvider>
          <ModalCreatePostProvider>
            <ModalPostDetailsProvider>
              <ModalContentDetailsProvider>
                <div className="">
                  <ActivePanel />
                  <ModalCreateChannel />
                  <ModalCreateChat />
                  <ModalCreatePost />
                  <ModalPostDetails />
                  <ModelContentDetails />
                  <Sidebar />
                  <div className="w-[calc(100vw-22rem)] fixed right-0 top-4 h-[calc(100vh-2rem)] p-4 shadow-xl shadow-blue-gray-900/5 rounded-l-xl ">
                    <Outlet />
                  </div>
                </div>
              </ModalContentDetailsProvider>
            </ModalPostDetailsProvider>
          </ModalCreatePostProvider>
        </ModalCreateChatProvider>
      </ModalCreateChannelProvider>
    </ActiveListProvider>
  );
}
