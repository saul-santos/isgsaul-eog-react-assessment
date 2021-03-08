import { createSlice, PayloadAction } from 'redux-starter-kit';
import { NUMBER_OF_READINGS_PER_HALF_HOUR } from '../../constants/constants';

export type ApiErrorAction = {
  error: string;
};

export type Measurament = {
  at: number
  metric: string
  unit: string
  value: number
};

export type ApiResponse = {
  metric: string
  measurements: Measurament[]
};

const initialState: {[key: string]: Measurament[]} = {
  flareTemp: [],
  oilTemp: [],
  casingPressure: [],
  tubingPressure: [],
  waterTemp: [],
  injValveOpen: [],
};

const slice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    setNewMeasurement: (state, action: PayloadAction<Measurament>) => {
      const { metric } = action.payload;
      const currentValues = [...state[metric]];

      // removes the first element to preserve the 30 mins time period
      if(currentValues.length > NUMBER_OF_READINGS_PER_HALF_HOUR - 1) {
        currentValues.shift();
      }

      return {...state, [metric]: [...currentValues, action.payload]};
    },
    setMultipleMeasurements: (state, action: PayloadAction<ApiResponse[]>) => {
      const newMeasurements: {[key: string]: Measurament[]} = {};
      
      action.payload.forEach(item => {
        const {metric, measurements } = item;
        newMeasurements[metric] = measurements;
      });
      
      return {...state, ...newMeasurements};
    },
    measuramentsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
