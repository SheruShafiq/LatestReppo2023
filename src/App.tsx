import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";
import Login from "@/pages/Login";
import { useAppSelector } from "@/lib/hooks/useAppSelector";
import { useAppDispatch } from "@/lib/hooks/useAppDispatch";
import {
  login,
  logout,
  selectSessionActive,
  selectSessionExpiresAt,
  selectSessionInitialised,
} from "@/lib/redux/slices/sessionSlice";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "@/pages/Home";
import NoMatch from "@/pages/NoMatch";
import { RoutePaths } from "@/lib/types/RoutesPaths";
import Offertes from "@/pages/Offertes";
import Marketing from "@/pages/Marketing";
import Customer from "@/pages/Portfolio/Customer/Customer";
import useSessionInit from "@/lib/hooks/useSessionInit";
import DefaultPageLayout from "@/components/DefaultPageLayout";
import LoginLayout from "@/components/LoginLayout";
import Search from "./pages/Portfolio/Search/Search";

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

  useEffect(() => {
    const channel = new BroadcastChannel("logoutChannel");
    channel.onmessage = (event) => {
      if (event.data === "userLoggedOut") {
        dispatch(logout()); // Update the isUserActive state to false
        window.location.href = RoutePaths.Login;
      }
    };
    return () => {
      channel.close();
    };
  }, [dispatch]);

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
          <Route path={RoutePaths.Login} element={<Login />} />
          <Route path={RoutePaths.Dashboard} element={<Home />} />
          <Route path={RoutePaths.Portfolio} element={<Search />} />
          <Route path={RoutePaths.PortfolioItem} element={<Customer />} />
          <Route path={RoutePaths.Quotes} element={<Offertes />} />
          <Route path={RoutePaths.Marketing} element={<Marketing />} />
          {/* <Route path={RoutePaths.Profile} element={<Home />} />
        <Route path={RoutePaths.Settings} element={<Home />} /> */}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </LayoutComponent>
    </>
  );
}

export default App;
