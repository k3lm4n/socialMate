import { Bars3Icon } from "@heroicons/react/24/outline";
import StatusBar from "../StatusBar";

import ExternalSideBar from "../ExternalSideBar";
import MemberCommunity from "../MemberList";


const InternalSideBar = () => {
  return (
    <>
      <input className="peer hidden" type="checkbox" id="sidebar-toggle" />
      <div className="animate-bounce fixed bottom-0 w-9 h-9 ml-5 mb-6 text-4xl bg-blue-900 rounded-full z-40 lg:hidden">
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
      <aside className=" ml-16 lg:ml-20 mt-4 lg:h-[calc(100vh-4.7rem)] h-[97%] rounded-tl-lg lg:w-72 w-[calc(100vw-4rem)] fixed bottom-0 bg-gray-100 lg:left-0  lg:shadow-2xl -left-[calc(100vw+5rem)] max-sm:rounded-tl-md animate-enterFromLeft peer-checked:max-lg:left-0 peer-checked:max-lg:animate-enterFromRight peer-checked:max-lg:z-20">
        <nav className="h-full">
          <MemberCommunity />
          <StatusBar />
        </nav>
      </aside>
    </>
  );
};

export default InternalSideBar;
