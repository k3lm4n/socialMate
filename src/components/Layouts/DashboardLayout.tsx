import { Outlet } from "react-router-dom";
import ActiveListProvider from "../../context/ActiveListContext";

export const DashboardLayout = () => {
  return (
    <ActiveListProvider>
      <div className="bg-gray-300 w-full h-screen">
        <Outlet />
      </div>
    </ActiveListProvider>
  );
};
