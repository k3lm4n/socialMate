import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Suspense, useContext, lazy } from "react";
const FeedPage = lazy(() => import("./pages/feed/discovery"));
const FeedLayout = lazy(() => import("./components/Layouts/FeedLayout"));
const ChatPage = lazy(() => import("./pages/feed/communities"));
const ChatPageView = lazy(() => import("./pages/feed/communities/chatView"));
const SettingsPage = lazy(() => import("./pages/feed/settings"));
const DashboardLayout = lazy(
  () => import("./components/Layouts/DashboardLayout")
);
const Settings = lazy(() => import("./pages/admin/settings"));
const Posts = lazy(() => import("./pages/admin/posts"));
const Users = lazy(() => import("./pages/admin/user"));
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const ChatPageContacts = lazy(() => import("./pages/feed/chats"));
const Homepage = lazy(() => import("./pages/homepage"));
const SignUp = lazy(() => import("./pages/auth/signup"));
const Login = lazy(() => import("./pages/auth/login"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
import { AuthContext } from "./context/AuthContext";

import Loading from "./components/Loading";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loading />}>
            <Homepage />
          </Suspense>
        }
      />
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

      <Route
        path="*"
        element={
          <Suspense fallback={<Loading />}>
            <NotFoundPage />
          </Suspense>
        }
      />
      <Route
        path="/feed/"
        element={
          <Suspense fallback={<Loading />}>
            <FeedLayout />
          </Suspense>
        }
      >
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
            path=":communityId"
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
            path=":communityId"
            element={
              <RequireAuth>
                <Suspense fallback={<Loading />}>
                  <ChatPageView />
                </Suspense>
              </RequireAuth>
            }
          />
        </Route>
      </Route>

      <Route
        path="dashboard/*"
        element={
          <Suspense fallback={<Loading />}>
            <DashboardLayout />
          </Suspense>
        }
      >
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
