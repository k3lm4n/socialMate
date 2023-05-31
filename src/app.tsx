import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import { parseCookies } from "nookies";

import { NotFoundPage } from "./pages/NotFoundPage";
import Homepage from "./pages/homepage";
import SignUp from "./pages/auth/signup";
import Login from "./pages/auth/login";
import FeedPage from "./pages/feed/discovery";
import { DashboardLayout } from "./components/Layouts/DashboardLayout";
import { ChatPage } from "./pages/feed/communities";
import ChatPageView from "./pages/feed/communities/chatView";
import SettingsPage from "./pages/feed/settings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/login" element={<Login />} />

      <Route path="*" element={<NotFoundPage />} />

      <Route path="/feed" element={<DashboardLayout />}>
        <Route
          path="discovery"
          element={
            <RequireAuth>
              <FeedPage />
            </RequireAuth>
          }
        />
        <Route
          path="settings"
          element={
            <RequireAuth>
              <SettingsPage />
            </RequireAuth>
          }
        />
        <Route
          path="communities"
          element={
            <RequireAuth>
              <ChatPage />
            </RequireAuth>
          }
        >
          <Route path=":communityId" element={<ChatPageView />} />
        </Route>
      </Route>
    </Routes>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let { "socialMate.token": token } = parseCookies();
  let location = useLocation();

  if (!token) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}
