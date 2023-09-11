import { useEffect, useState } from "react";

const usePublicData = (endpoint: string) => {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(endpoint);
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, [endpoint]);

  return data;
};

export default usePublicData;
