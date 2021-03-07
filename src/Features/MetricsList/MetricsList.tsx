import React from "react";
import { Provider, createClient, useQuery } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import LinearProgress from '@material-ui/core/LinearProgress';
import SelectMultiple from "../../components/SelectMultiple";
import { IState } from '../../store';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `{
  getMetrics
}
`;

const getMetricsList = (state: IState) => state.metricsList;

export default () => {
  return (
    <Provider value={client}>
      <MetricsList />
    </Provider>
  );
};

function MetricsList() {
  const dispatch = useDispatch();
  const { list, selectedMetrics } = useSelector(getMetricsList);

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
