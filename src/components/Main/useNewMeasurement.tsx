import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useSubscription } from 'urql';
import { actions as measuramentActions } from '../../store/measurements/reducer';
import { newMeasuramentsQuery } from '../../constants/queries';
import { IState } from '../../store';

const getMetrics = (state: IState) => state.metrics;

const useNewMeasurement = () => {
  const dispatch = useDispatch();
  const [newMeasuramentsRes] = useSubscription({ query: newMeasuramentsQuery });
  const { selectedMetrics } = useSelector(getMetrics);

  React.useEffect(() => {
    const { data, error } = newMeasuramentsRes;

    if (error) {
      dispatch(measuramentActions.measuramentsApiErrorReceived({ error: error.message }));
      return;
    }

    if (!data) return;
    const { newMeasurement } = data;
    const isMetricSelected = selectedMetrics.includes(newMeasurement.metric);

    if (isMetricSelected) {
      dispatch(measuramentActions.setNewMeasurement(newMeasurement));
    }
  }, [dispatch, selectedMetrics, newMeasuramentsRes]);
};

export default useNewMeasurement;
