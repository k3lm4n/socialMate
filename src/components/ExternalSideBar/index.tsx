import UnionLogo from "../../assets/unionLogo.svg";
import {
  PlusIcon,
  ArrowLeftIcon,
  CogIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import ListGroup from "../ListGroup";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ActiveListContext } from "../../context/ActiveListContext";
import { ModalCreateChannelContext } from "../../context/ModalCreateChannelContext";

const ExternalSideBar = () => {
  const location = useLocation();
  const ctx_act = useContext(ActiveListContext);
  const ctx_mdl = useContext(ModalCreateChannelContext);

  return (
    <div
      className={
        location.pathname !== "/feed/settings"
          ? " max-sm:backdrop-blur-md  max-sm:bg-black/30 max-sm:w-screen max-sm:h-screen"
          : ""
      }
    >
      <aside className="h-screen lg:w-20 w-16 fixed left-0 right-0 top-0  mt-6">
        <nav className="h-full w-full">
          <ul className="w-full flex flex-col items-center overflow-scroll">
            <li className=" lg:w-11 lg:h-11 md:mt-5 md:mb-2 rounded-full bg-white hover:shadow-inner transition-all duration-500">
              <Link
                to={"/feed/discovery"}
                className=" flex items-center justify-center lg:w-11 w-9 lg:h-11 h-9"
              >
                <img
                  src={UnionLogo}
                  alt="Logo"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </Link>
            </li>
            <li className="flex items-center justify-center lg:w-12 w-8 lg:h-12 h-8 my-2 rounded-full bg-white hover:shadow-inner transition-all duration-300">
              <button onClick={() => ctx_act.handle()}>
                <ChatBubbleLeftRightIcon
                  fill="#3298"
                  className="h-8 w-8"
                  color="#3298"
                />
              </button>
            </li>
            <span className="flex w-10 h-[2px] bg-black/30 max-sm:my-1 max-sm:mt-3 " />

            <ListGroup />

            <li className="flex items-center justify-center lg:w-12 w-8 lg:h-12 h-8 my-2 rounded-full bg-white hover:shadow-inner transition-all duration-300">
              <button
                onClick={() => ctx_mdl.handle()}
                className=" flex items-center justify-center lg:w-12 w-8 lg:h-12 h-8"
              >
                <PlusIcon className="h-6 w-6" color="#3BA55D" />
              </button>
            </li>

            <li className="flex items-center justify-center lg:w-12 w-8 lg:h-12 h-8 my-2 rounded-full bg-white hover:shadow-inner transition-all duration-300">
              <Link
                to={"/feed/settings"}
                className=" flex items-center justify-center lg:w-12 w-8 lg:h-12 h-8"
              >
                <CogIcon className="h-6 w-6" />
              </Link>
            </li>
            <li className="flex items-center justify-center lg:w-11 w-8 lg:h-11 h-8 my-2 rounded-full bg-gray-250 hover:shadow-inner transition-all duration-300">
              <Link
                to={"/"}
                className=" flex items-center justify-center lg:w-11 w-8 lg:h-11 h-8"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default ExternalSideBar;
