import { Outlet, useLocation } from "react-router-dom";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  login,
  logout,
  selectSessionActive,
  selectSessionExpiresAt,
  selectSessionInitialised,
} from "@/lib/redux/slices/sessionSlice";

import Customer from "@/pages/Portfolio/Customer/Customer";
import DefaultPageLayout from "@/components/DefaultPageLayout";
import Documents from "./pages/Documents";
import DocumentsAdmin from "./pages/DocumentsAdmin";
import ErrorLogging from "./pages/ErrorLogging";
import FaqAdmin from "./pages/FaqAdmin";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import LoginLayout from "@/components/LoginLayout";
import Marketing from "@/pages/Marketing";
import NewsAdmin from "./pages/NewsAdmin";
import NoMatch from "@/pages/NoMatch";
import NotificationsAdmin from "./pages/NotificationsAdmin";
import Offertes from "@/pages/Offertes";
import { RoutePaths } from "@/lib/types/RoutesPaths";
import Search from "./pages/Portfolio/Search/Search";
import Settings from "./pages/Settings";
import UserManagement from "./pages/UserManagement";
import { useAppDispatch } from "@/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/lib/hooks/useAppSelector";
import { useEffect } from "react";
import useSessionInit from "@/lib/hooks/useSessionInit";
import { useTranslation } from "react-i18next";

function App() {
  const isUserActive = useAppSelector(selectSessionActive);
  const isInitialized = useAppSelector(selectSessionInitialised);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { result, isLoading, error }: any = useSessionInit();

  useEffect(() => {
    if (isInitialized && !isUserActive) {
      navigate("/login");
    }
  }, [isUserActive, isInitialized, navigate]);

  const location = useLocation();

  const isLoginPage = location.pathname === RoutePaths.Login;
  const LayoutComponent = isLoginPage ? LoginLayout : DefaultPageLayout;

  // if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!isInitialized) return <></>;

  return (
    <>
      <LayoutComponent>
        <Routes>
          <Route path={RoutePaths.Home} element={<Home />} />
          <Route path={RoutePaths.Documents} element={<Documents />} />
          <Route
            path={RoutePaths.DocumentsAdmin}
            element={<DocumentsAdmin />}
          />
          <Route path={RoutePaths.ErrorLogging} element={<ErrorLogging />} />
          <Route
            path={RoutePaths.NotificationsAdmin}
            element={<NotificationsAdmin />}
          />
          <Route
            path={RoutePaths.UserManagement}
            element={<UserManagement />}
          />
          <Route path={RoutePaths.FaqAdmin} element={<FaqAdmin />} />
          <Route path={RoutePaths.Settings} element={<Settings />} />
          <Route path={RoutePaths.Login} element={<Login />} />
          <Route path={RoutePaths.Dashboard} element={<Home />} />
          <Route path={RoutePaths.Portfolio} element={<Search />} />
          <Route path={RoutePaths.PortfolioItem} element={<Customer />} />
          <Route path={RoutePaths.Quotes} element={<Offertes />} />
          <Route path={RoutePaths.Marketing} element={<Marketing />} />
          <Route path={RoutePaths.NewsAdmin} element={<NewsAdmin />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </LayoutComponent>
    </>
  );
}

export default App;
