// import { useContext } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import StatusBar from "../StatusBar";
import ExternalSideBar from "../ExternalSideBar";
import {
  ChatBubbleLeftEllipsisIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
// import { ModalCreateChatContext } from "../../context/ModalCreateChatContext";
import ChatList from "../ChatList";

const Chats = () => {
  // const ctx = useContext(ModalCreateChatContext);

  return (
    <>
      <input className="peer hidden" type="checkbox" id="sidebar-toggle" />
      <div className="animate-bounce fixed top-0 right-0 w-9 h-9 mr-2 mt-24 text-4xl bg-blue-900 rounded-full z-40 lg:hidden">
        <label
          htmlFor="sidebar-toggle"
          className="flex justify-center items-center w-full h-full"
        >
          <Bars3Icon width={24} height={24} className="text-white" />
        </label>
      </div>
      <div className="animate-exitToLeft fixed peer-checked:max-lg:animate-fadeIn max-sm:hidden peer-checked:block peer-checked:z-20 peer-checked:max-sm:left-0 w-16 max-sm:-left-[calc(100vw+5rem)] lg-20 ">
        <ExternalSideBar />
      </div>
      <aside className="ml-16 lg:ml-20 mt-4 lg:h-[calc(100vh-1.5rem)] h-[97%] rounded-tl-lg lg:w-64 w-[calc(100vw-4rem)] fixed bottom-0 bg-gray-100 lg:left-0  lg:shadow-2xl -left-[calc(100vw+5rem)] max-sm:rounded-tl-md animate-enterFromLeft peer-checked:max-lg:left-0 peer-checked:max-lg:animate-enterFromRight peer-checked:max-lg:z-20">
        <nav className="h-full w-full flex flex-col">
          <div className="bg-white flex flex-row h-14 rounded-lg justify-between items-center mx-2 px-2 my-2 py-2">
            <div className=" flex items-center gap-2 ">
              <div className="flex justify-center items-center top-0 lg:w-11 w-8 lg:h-11 h-8 rounded-full ">
                <ChatBubbleLeftEllipsisIcon
                  width={28}
                  height={28}
                  className="fill-blue-300"
                />
              </div>
              <p className=" text-xl font-bold text-gray-800 ">Conversas</p>
            </div>
            <div className=" flex items-center gap-2 ">
              {/* <button onClick={() => ctx.handle()}> */}
              <PlusCircleIcon className="h-8 w-8 fill-green-500" />
              {/* </button> */}
            </div>
          </div>
          <div className="flex flex-col h-full justify-between ">
            <div>
              <ChatList />
            </div>
            <StatusBar />
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Chats;
