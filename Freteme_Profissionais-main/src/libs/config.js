import { useState, useEffect } from 'react';
import { useServer } from '../libs/server';
const useConfig = () => {
  const { getConfig } = useServer();
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const configData = await getConfig();
        setConfig(configData);
      } catch (error) {
        console.error('Error fetching config data:', error);
      }
    };

    fetchData();
  }, []);

  return [config];
};
export default useConfig;
