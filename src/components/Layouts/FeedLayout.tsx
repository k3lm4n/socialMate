import { Outlet } from "react-router-dom";
import ActiveListProvider from "../../context/ActiveListContext";
import ActivePanel from "../ActivePanel";

export const FeedLayout = () => {
  return (
    <ActiveListProvider>
      <div className="bg-gray-300 w-full h-screen">
        <ActivePanel />

        <Outlet />
      </div>
    </ActiveListProvider>
  );
};
  