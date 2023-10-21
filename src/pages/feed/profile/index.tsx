import { useContext } from "react";
import ExternalSideBar from "../../../components/ExternalSideBar";
import PostRipperProfile from "../../../components/PostRipperProfile";
import ProfileHeading from "../../../components/ProfileHeading";
import { AuthContext } from "../../../context/AuthContext";

export default function Manager() {
  const ctx = useContext(AuthContext);
  return (
    <>
      <ExternalSideBar />
      <div className="lg:w-[calc(100vw-5rem)] w-[calc(100vw-4rem)] mt-4 h-screen fixed right-0 bg-gray-50 rounded-tl-lg shadow-xl overflow-auto ">
        <div className="flex justify-center w-full pt-4 flex-col  ">
          <ProfileHeading />
          <div className="w-full flex ">
            <div className="border-t-[1px] px-2 mx-2">
              <h1 className="w-full text-center mt-2 font-bold text-2xl">
                Interesses
              </h1>
              <ul className="flex flex-col">
                {ctx.user?.interest.map((item) => (
                  <li key={item.id} className="flex flex-row ">
                    <a
                      href={"/feed/profile"}
                      className="flex items-center w-full h-11 mt-1 rounded-md hover:bg-blue-50/25 transition-all duration-300 gap-x-2"
                    >
                      <img
                        src={"https://ui-avatars.com/api/" + item.name}
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
            <PostRipperProfile />
          </div>
        </div>
      </div>
    </>
  );
}
