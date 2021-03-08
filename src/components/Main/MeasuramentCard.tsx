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

export type MeasuramentCardProps = { label: string };

const getMeasuraments = (state: IState) => state.measuraments;

export default ({ label }: MeasuramentCardProps) => {
  const classes = useStyles();
  const measuraments = useSelector(getMeasuraments);
  let value = 0;

  if(measuraments[label].length > 0) {
    value = measuraments[label][measuraments[label].length - 1].value;
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
