import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useSubscription } from 'urql';
import { actions as measuramentActions } from "../../store/measuraments/reducer";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { IState } from '../../store';
import Metrics from "./Metrics";
import MeasuramentCard from "./MeasuramentCard";

const newMeasuraments = `
subscription {
  newMeasurement {
    metric
    at
    value
    unit
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
  const { selectedMetrics } = useSelector(getMetrics);
  const classes = useStyles();
  const [measuramentsRes] = useSubscription({ query: newMeasuraments });
  
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
            <Metrics />
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