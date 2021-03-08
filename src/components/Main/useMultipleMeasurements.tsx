import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'urql';
import { actions as measuramentActions } from '../../store/measurements/reducer';
import { multipleMeasuramentsQuery } from '../../constants/queries';
import { IState } from '../../store';

const getMetrics = (state: IState) => state.metrics;

const useMultipleMeasurements = () => {
  const dispatch = useDispatch();
  const { selectedMetrics, multipleMeasuramentsQueryInput } = useSelector(getMetrics);
  const [multipleMeasuramentsRes] = useQuery({
    query: multipleMeasuramentsQuery,
    variables: { input: multipleMeasuramentsQueryInput },
    pause: selectedMetrics.length === 0 || !multipleMeasuramentsQueryInput
  });

  React.useEffect(() => {
    const { data, error } = multipleMeasuramentsRes;

    if (error) {
      dispatch(measuramentActions.measuramentsApiErrorReceived({ error: error.message }));
      return;
    }

    if (!data) return;
    const { getMultipleMeasurements } = data;
    dispatch(measuramentActions.setMultipleMeasurements(getMultipleMeasurements));
  }, [dispatch, multipleMeasuramentsRes]);
};

export default useMultipleMeasurements;
