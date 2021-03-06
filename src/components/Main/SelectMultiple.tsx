import React from 'react';
import { useDispatch } from 'react-redux';
import { actions as metricsActions } from '../../store/metrics/reducer';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '../Chip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export type SelectMultipleProps = {
  label: string,
  options: string[],
  selected: string[],
}

export default ({ label, options, selected }: SelectMultipleProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleMetricsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedMetrics = event.target.value;
    dispatch(metricsActions.setSelectedMetrics(selectedMetrics as string[]));
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="metrics-label">{label}</InputLabel>
        <Select
          labelId={label}
          id={label}
          multiple
          value={selected}
          onChange={handleMetricsChange}
          input={<Input id={label} />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option} style={getStyles(option, selected, theme)}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
