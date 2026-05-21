import { useState, useEffect } from 'react';
import { fetchPlotData } from '../services/api';

const usePlotData = (plotId) => {
  const [plotData, setPlotData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPlotData = async () => {
      try {
        setLoading(true);
        const data = await fetchPlotData(plotId);
        setPlotData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (plotId) {
      getPlotData();
    }
  }, [plotId]);

  return { plotData, loading, error };
};

export default usePlotData;