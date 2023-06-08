import { useAppDispatch } from "./useAppDispatch";
import { useState, useEffect } from "react";
import { login } from "../redux/slices/sessionSlice";

const useSessionInit = () => {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useAppDispatch();

  async function fetchSessionInit() {
    try {
      const res = await fetch("/api/sessions/init");
      const data = await res.json();
      setResult(data);
      dispatch(login(data));
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSessionInit();
  }, []);

  return { result, isLoading, error };
};

export default useSessionInit;
