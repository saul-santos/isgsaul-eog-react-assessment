import React from "react";
import { useDispatch } from 'react-redux';
import { useQuery } from 'urql';
import { actions as metricsActions } from '../../store/metrics/reducer';
import { metricsQuery } from '../../constants/queries';

const useMetrics = () => {
  const dispatch = useDispatch();
  const [metricsRes] = useQuery({ query: metricsQuery });

  React.useEffect(() => {
    const { data, error } = metricsRes;

    if (error) {
      dispatch(metricsActions.metricsApiErrorReceived({ error: error.message }));
      return;
    }

    if (!data) return;
    const { getMetrics } = data;
    dispatch(metricsActions.metricsDataRecevied(getMetrics));
  }, [dispatch, metricsRes]);
};

export default useMetrics;
