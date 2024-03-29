import { useContext } from "react";
import { MicrophoneIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const StatusBar = () => {
  const context = useContext(AuthContext);

  return (
    <div className="bottom-0 py-2  flex flex-row lg:w-full w-[calc(100vw-4rem)] h-14 items-center bg-gray-200 z-20 ">
      <a href={"/feed/feed"} className="flex flex-row ">
        <div className="flex items-center w-8 h-8 mt-1 ml-3 rounded-xl ">
          <img
            src={"https://api.multiavatar.com/zoe.svg"}
            alt="Icon"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <div className=" rounded-full w-2 h-2 bg-green-500 fixed ml-7 mt-5 ring-2 ring-green-400" />
        </div>
      </a>
      <div className="flex flex-col ml-3 w-full">
        <p className="text-sm font-regular">{context.user?.name}</p>
        <p className="text-xs font-regular text-gray-700">
          @{context.user?.username}
        </p>
      </div>
      <div className="flex flex-row mr-3 items-center">
        <MicrophoneIcon className="h-6 w-6 ml-2" />
        <Link to={"/feed/settings"}>
          <Cog6ToothIcon className="h-6 w-6 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default StatusBar;
