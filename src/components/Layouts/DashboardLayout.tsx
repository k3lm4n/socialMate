import { Outlet } from "react-router-dom";
import ActiveListProvider from "../../context/ActiveListContext";
import Sidebar from "../Sidebar";

export default function DashboardLayout() {
  return (
    <ActiveListProvider>
      <div className="">
        <Sidebar />
        <div className="w-[calc(100vw-22rem)] fixed right-0 top-4 h-[calc(100vh-2rem)] p-4 shadow-xl shadow-blue-gray-900/5 rounded-l-xl ">
          <Outlet />
        </div>
      </div>
    </ActiveListProvider>
  );
}
