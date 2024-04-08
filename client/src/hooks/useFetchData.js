import { useState, useEffect } from "react";

export const useFetchData = (fetchFunction, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchFunction(token);
        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
    // Cleanup function to abort fetch if component unmounts
    return () => {
      // Abort fetch operation or any cleanup logic if needed
    };
  }, [fetchFunction, token]);

  return { data, loading, error };
};
