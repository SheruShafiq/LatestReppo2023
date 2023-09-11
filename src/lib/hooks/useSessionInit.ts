import { login, setSessionExpiresAt } from "../redux/slices/sessionSlice";
import { useEffect, useState } from "react";

import { useAppDispatch } from "./useAppDispatch";
import { useRef } from "react";

const useSessionInit = () => {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const hasBeenCalled = useRef(false); // replace useState with useRef
  const dispatch = useAppDispatch();

  async function fetchSessionInit() {
    try {
      const res = await fetch("/api/sessions/init");

      dispatch(
        setSessionExpiresAt(res.headers.get("x-session-expires"))
      );
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
    if (!hasBeenCalled.current) { // access .current to get the value of the ref
      fetchSessionInit();
      hasBeenCalled.current = true; // no need to set dependencies as the value changing won't trigger a re-render
    }
  }, []); // remove hasBeenCalled from dependencies

  return { result, isLoading, error };
};

export default useSessionInit;

