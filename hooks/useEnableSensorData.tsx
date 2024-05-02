import { useEffect, useState } from "react";
import axios from "axios";
import { apiConfig } from "@config";

const useEnableSensorData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetch, setFetch] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    console.log("fetch", fetch);

    if (!fetch) return;
    const fn = async function () {
      setIsLoading(true);
      try {
        const { data } = await axios.put(
          apiConfig.baseUrl + "/sensor/data/enable"
        );
        setData(data);
      } catch (error) {
        setError(JSON.stringify(error));
      } finally {
        setIsLoading(false);
        setFetch(false);
      }
    };
    fn();
  }, [fetch]);

  const fetchSensorData = () => {
    setFetch(true);
  };

  return { isLoading, error, fetchSensorData, data };
};

export default useEnableSensorData;
