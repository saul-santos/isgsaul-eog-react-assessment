import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useSubscription, useQuery } from 'urql';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { actions as metricsActions } from '../../store/metrics/reducer';
import { actions as measuramentActions } from "../../store/measurements/reducer";
import { IState } from '../../store';
import SelectMultiple from "./SelectMultiple";
import MeasurementCard from "./MeasurementCard";
import Graph from "./Graph";
import { metricsQuery, newMeasuramentsQuery, multipleMeasuramentsQuery } from "../../constants/queries";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: 15
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

const getMetrics = (state: IState) => state.metrics;

export default function Main() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { list, selectedMetrics, multipleMeasuramentsQueryInput } = useSelector(getMetrics);

  // QUERIES INVOCATION
  const [metricsRes] = useQuery({ query: metricsQuery });
  const [newMeasuramentsRes] = useSubscription({ query: newMeasuramentsQuery });
  const [multipleMeasuramentsRes] = useQuery({
    query: multipleMeasuramentsQuery,
    variables: { input: multipleMeasuramentsQueryInput },
    pause: selectedMetrics.length === 0 || !multipleMeasuramentsQueryInput
  });

  // METRICS
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

  const handleMetricsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedMetrics = event.target.value;
    dispatch(metricsActions.setSelectedMetrics(selectedMetrics as string[]));
  };


  // NEW MEASURAMENT
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


  // MULTIPLE MEASURAMENTS
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


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SelectMultiple label="Metrics" options={list} selected={selectedMetrics} handleChange={handleMetricsChange} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {selectedMetrics.map(metric => <Grid item xs={2} key={metric}>
          <MeasurementCard label={metric} />
        </Grid>)}
      </Grid>

      <Grid container spacing={3} justify="center">
        <Grid item xs={10} md={8}>
          {selectedMetrics.length > 0 && <Graph />}
        </Grid>
      </Grid>
    </div>
  );
}