import useSWR from "swr";

export function useSessionDestroy() {
  const { data, error } = useSWR("/api/sessionDestroy");

  return {
    session: data,
    isLoading: !error && !data,
    isError: error,
  };
}
