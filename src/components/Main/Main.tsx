import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { IState } from '../../store';
import SelectMultiple from './SelectMultiple';
import MeasurementCard from './MeasurementCard';
import Graph from './Graph';
import useMetrics from "./useMetrics";
import useNewMeasurement from './useNewMeasurement';
import useMultipleMeasurements from './useMultipleMeasurements';

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
  const classes = useStyles();
  const { list, selectedMetrics } = useSelector(getMetrics);

  useMetrics();
  useNewMeasurement();
  useMultipleMeasurements();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <Grid item>
          <SelectMultiple label="Metrics" options={list} selected={selectedMetrics}/>
        </Grid>
      </Grid>

      <Grid container spacing={3} justify="center">
        {selectedMetrics.map(metric => <Grid item xs={3} key={metric}>
          <MeasurementCard label={metric} />
        </Grid>)}
      </Grid>

      <Grid container spacing={3} justify="center">
        <Grid item>
          {selectedMetrics.length > 0 && <Graph />}
        </Grid>
      </Grid>
    </div>
  );
}