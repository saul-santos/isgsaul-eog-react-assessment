import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useSubscription, useQuery } from 'urql';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { actions as metricsActions } from '../../store/metrics/reducer';
import { actions as measuramentActions } from "../../store/measuraments/reducer";
import { IState } from '../../store';
import SelectMultiple from "./SelectMultiple";
import MeasuramentCard from "./MeasuramentCard";

const metricsQuery = `{
  getMetrics
}
`;

const newMeasuramentsQuery = `
subscription {
  newMeasurement {
    metric
    at
    value
    unit
  }
}
`;

const multipleMeasuramentsQuery = `
query($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      metric
      at
      value
      unit
    }
  }
}
`;

const getMetrics = (state: IState) => state.metrics;

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

export default function Main() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [multipleMeasuramentsRes] = useQuery({ query: multipleMeasuramentsQuery });
  
  // METRICS
  const { list, selectedMetrics } = useSelector(getMetrics);
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

  const handleMetricsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(metricsActions.setSelectedMetrics(event.target.value as string[]));
  };

  // NEW MEASURAMENT
  const [measuramentsRes] = useSubscription({ query: newMeasuramentsQuery });

  React.useEffect(() => {
    const { data, error } = measuramentsRes;
    if (error) {
      dispatch(measuramentActions.measuramentsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { newMeasurement } = data;
    dispatch(measuramentActions.newMeasurament(newMeasurement));
  }, [dispatch, measuramentsRes]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SelectMultiple label="Metrics" options={list} selected={selectedMetrics} handleChange={handleMetricsChange} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {selectedMetrics.map(metric => <Grid item xs={2} key={metric}>
          <MeasuramentCard label={metric} />
        </Grid>)}
      </Grid>
    </div>
  );
}