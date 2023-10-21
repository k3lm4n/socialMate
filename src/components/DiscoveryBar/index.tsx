import { Bars3Icon } from "@heroicons/react/24/outline";
import StatusBar from "../StatusBar";
import ExternalSideBar from "../ExternalSideBar";
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext';


const DiscoveryBar = () => {

  const ctx = useContext(AuthContext);
  

  return (
    <>
      <input className="peer hidden" type="checkbox" id="sidebar-toggle" />
      <div className="animate-bounce fixed top-0 right-0  w-9 h-9 mr-2 mt-6  text-4xl bg-blue-900 rounded-full z-40 lg:hidden">
        <label
          htmlFor="sidebar-toggle"
          className="flex justify-center items-center w-full h-full"
        >
          <Bars3Icon width={24} height={24} className="text-white" />
        </label>
      </div>
      {/* <div className="h-screen w-screen opacity-0 backdrop-blur-sm animate-fadeOut peer-checked:animate-fadeIn peer-checked:z-10 "></div> */}
      <div className="animate-exitToLeft fixed peer-checked:max-lg:animate-fadeIn peer-checked:z-20 peer-checked:max-sm:left-0 w-16 max-sm:-left-[calc(100vw+5rem)] lg-20 ">
        <ExternalSideBar />
      </div>

      <aside className="ml-16 lg:ml-20 mt-4 lg:h-[calc(100vh-1rem)] h-[99.5%] rounded-tl-lg lg:w-64 w-[calc(100vw-4rem)] fixed bg-gray-100 lg:left-0  lg:shadow-2xl -left-[calc(100vw+5rem)] animate-enterToLeft peer-checked:max-lg:left-0 peer-checked:max-lg:animate-enterFromRight peer-checked:max-lg:z-30 ">
        <nav className="h-full flex flex-col justify-between">
          <div>
            <h1 className="mt-2 ml-6 mb-6 font-bold lg:text-4xl text-2xl">
              Interesses
            </h1>
            <ul className="flex flex-col">
              {ctx.user?.interest.map((item) => (
                <li key={item.id} className="flex flex-row pl-2 ">
                  <a
                    href={"/feed/discovery"}
                    className="flex items-center  w-full h-11 mt-1 rounded-md hover:bg-blue-50/25 transition-all duration-300 gap-x-2"
                  >
                    <img
                      src={"https://ui-avatars.com/api/" +item.name}
                      alt="Icon"
                      width={36}
                      height={36}
                      className="h-10 w-10 rounded-full"
                    />
                    <p className="text-sm font-regular">{item.name}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="max-sm:hidden">
            <StatusBar />
          </div>
        </nav>
      </aside>
    </>
  );
};

export default DiscoveryBar;
