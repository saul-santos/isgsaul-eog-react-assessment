import React from "react";
import { useQuery } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../store/metrics/reducer';
import LinearProgress from '@material-ui/core/LinearProgress';
import SelectMultiple from "../SelectMultiple";
import { IState } from '../../store';

const query = `{
  getMetrics
}
`;

const getMetrics = (state: IState) => state.metrics;

export default function MetricsList() {
  const dispatch = useDispatch();
  const { list, selectedMetrics } = useSelector(getMetrics);

  const [result] = useQuery({ query });
  const { data, fetching, error } = result;

  React.useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMetrics } = data;
    dispatch(actions.metricsDataRecevied(getMetrics));
  }, [dispatch, data, error]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(actions.setSelectedMetrics(event.target.value as string[]));
  };

  if (fetching) return <LinearProgress />;

  return (
    <SelectMultiple label="Metrics" options={list} selected={selectedMetrics} handleChange={handleChange} />
  );
}
