import { useContext } from "react";
import { MicrophoneIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../../context/AuthContext";

const StatusBar = () => {
  const context = useContext(AuthContext);

  return (
    <div className="bottom-0 py-2 fixed flex flex-row lg:w-72 w-[calc(100vw-4rem)] h-14 items-center bg-gray-200 z-20">
      <a href={"/feed/feed"} className="flex flex-row ">
        <div className="flex items-center w-8 h-8 mt-1 ml-3 rounded-xl ">
          <img
            src={"https://api.multiavatar.com/zoe.svg"}
            alt="Icon"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <div className=" rounded-4xl w-2 h-2 bg-green-500 fixed bottom-0 ml-6 mb-2 ring-2 ring-green-400" />
        </div>
      </a>
      <div className="flex flex-col ml-3 w-full">
        <p className="text-sm font-regular">{context.user?.name}</p>
        <p className="text-xs font-regular text-gray-700">k3lm4n</p>
      </div>
      <div className="flex flex-row mr-3 items-center">
        <MicrophoneIcon className="h-6 w-6 ml-2" />
        <Cog6ToothIcon className="h-6 w-6 ml-2" />
      </div>
    </div>
  );
};

export default StatusBar;
