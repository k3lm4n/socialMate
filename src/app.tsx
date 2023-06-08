import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import { parseCookies } from "nookies";

import { NotFoundPage } from "./pages/NotFoundPage";
import Homepage from "./pages/homepage";
import SignUp from "./pages/auth/signup";
import Login from "./pages/auth/login";
import FeedPage from "./pages/feed/discovery";
import { FeedLayout } from "./components/Layouts/FeedLayout";
import { ChatPage } from "./pages/feed/communities";
import ChatPageView from "./pages/feed/communities/chatView";
import SettingsPage from "./pages/feed/settings";
import DashboardLayout from "./components/Layouts/DashboardLayout";
import { Settings } from "./pages/admin/settings";
import { Posts } from "./pages/admin/posts";
import { Users } from "./pages/admin/user";
import Dashboard from "./pages/admin/dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/login" element={<Login />} />

      <Route path="*" element={<NotFoundPage />} />

      <Route path="/feed/*" element={<FeedLayout />}>
        <Route
          path="*"
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

      <Route path="dashboard/*" element={<DashboardLayout />}>
        <Route
          path="*"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
        <Route
          path="posts"
          element={
            <RequireAuth>
              <Posts />
            </RequireAuth>
          }
        />
        <Route
          path="users"
          element={
            <RequireAuth>
              <Users />
            </RequireAuth>
          }
        />
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
