import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IState } from '../../store';

const useStyles = makeStyles({
  root: {
    minWidth: 100
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export type MeasurementCardProps = { label: string };

const getMeasurements = (state: IState) => state.measurements;

export default ({ label }: MeasurementCardProps) => {
  const classes = useStyles();
  const measurements = useSelector(getMeasurements);
  let value = 0;

  if(measurements[label].length > 0) {
    value = measurements[label][measurements[label].length - 1].value;
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {label}
        </Typography>
        <Typography variant="h5" component="h2">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
