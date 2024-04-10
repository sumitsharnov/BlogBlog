import { useState, useEffect } from "react";

export const useFetchData = (fetchFunction, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        const fetchedData = await fetchFunction(token, { signal });
        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to abort fetch if component unmounts
    return () => {
      abortController.abort(); // Abort the fetch request
    };
  }, [fetchFunction, token]);

  return { data, loading, error };
};
