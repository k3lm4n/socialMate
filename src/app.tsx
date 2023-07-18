import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Suspense, useContext, lazy } from "react";
import { AuthContext } from "./context/AuthContext";
import Loading from "./components/Loading";

const FeedPage = lazy(() => import("./pages/feed/discovery"));
const ChatPage = lazy(() => import("./pages/feed/communities"));
const ChatPageView = lazy(() => import("./pages/feed/communities/chatView"));
const SettingsPage = lazy(() => import("./pages/feed/settings"));
const Settings = lazy(() => import("./pages/admin/settings"));
const Posts = lazy(() => import("./pages/admin/posts"));
const Users = lazy(() => import("./pages/admin/user"));
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const ChatPageContacts = lazy(() => import("./pages/feed/chats"));
const ChannelDetails = lazy(() => import("./pages/feed/communities/details"));
const Profile = lazy(() => import("./pages/admin/profile"));
const Channels = lazy(() => import("./pages/admin/Channels"));
const FilesManager = lazy(() => import("./pages/admin/fileManager"));
const Courses = lazy(() => import("./pages/admin/courses"));
const Interests = lazy(() => import("./pages/admin/interests"));

import FeedLayout from "./components/Layouts/FeedLayout";
import DashboardLayout from "./components/Layouts/DashboardLayout";
import Homepage from "./pages/homepage";
import SignUp from "./pages/auth/signup";
import Login from "./pages/auth/login";
import NotFoundPage from "./pages/NotFoundPage";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/auth/">
        <Route
          path="signup"
          element={
            <Suspense fallback={<Loading />}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path="login"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
      <Route path="/feed/" element={<FeedLayout />}>
        <Route
          path="discovery"
          element={
            <RequireAuth>
              <Suspense fallback={<Loading />}>
                <FeedPage />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="chats"
          element={
            <RequireAuth>
              <Suspense fallback={<Loading />}>
                <ChatPageContacts />
              </Suspense>
            </RequireAuth>
          }
        >
          <Route
            path=":chatId"
            element={
              <RequireAuth>
                <Suspense fallback={<Loading />}>
                  <ChatPageView />
                </Suspense>
              </RequireAuth>
            }
          />
        </Route>
        <Route
          path="settings"
          element={
            <RequireAuth>
              <Suspense fallback={<Loading />}>
                <SettingsPage />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path=":channelId"
          element={
            <RequireAuth>
              <Suspense fallback={<Loading />}>
                <ChatPage />
              </Suspense>
            </RequireAuth>
          }
        >
          <Route
            path=":chatId"
            element={
              <RequireAuth>
                <Suspense fallback={<Loading />}>
                  <ChatPageView />
                </Suspense>
              </RequireAuth>
            }
          />
          <Route
            path="details"
            element={
              <Suspense fallback={<Loading />}>
                <ChannelDetails />
              </Suspense>
            }
          />
        </Route>
      </Route>

      <Route path="dashboard/*" element={<DashboardLayout />}>
        <Route
          path="*"
          element={
            <RequireAuth>
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="settings"
          element={
            <RequireAuth>
              <Suspense fallback={<Loading />}>
                <Settings />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="posts"
          element={
            <RequireAuth>
              <Suspense fallback={<Loading />}>
                <Posts />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="users"
          element={
            <RequireAuth>
              <Suspense fallback={<Loading />}>
                <Users />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="channels"
          element={
            <RequireAuth>
              <Suspense fallback={<Loading />}>
                <Channels />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <Suspense fallback={<Loading />}>
                <Profile />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="filemanager"
          element={
            <RequireAuth>
              <Suspense fallback={<Loading />}>
                <FilesManager />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="courses"
          element={
            <RequireAuth>
              <Suspense fallback={<Loading />}>
                <Courses />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="interests"
          element={
            <RequireAuth>
              <Suspense fallback={<Loading />}>
                <Interests />
              </Suspense>
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const ctx = useContext(AuthContext);
  const location = useLocation();

  if (ctx.authData.isAuth === undefined) {
    return null;
  }

  if (ctx.authData.isAuth === "isLoggedOut") {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}
