import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectSessionActive } from "../redux/slices/sessionSlice";
import { useAppSelector } from "./useAppSelector";

const useUserSessionRedirect = () => {
  const navigate = useNavigate();
  const isUserActive = useAppSelector(selectSessionActive);

  useEffect(() => {
    if (isUserActive) {
      navigate("/");
    }
  }, [isUserActive, navigate]);
};

export default useUserSessionRedirect;
