import { createSlice, PayloadAction } from 'redux-starter-kit';

export type ApiErrorAction = {
  error: string;
};

export type Measurament = {
  at: number
  metric: string
  unit: string
  value: number
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
  name: 'measuraments',
  initialState,
  reducers: {
    newMeasurament: (state, action: PayloadAction<Measurament>) => {
      const { metric } = action.payload;
      return {...state, [metric]: [...state[metric], action.payload]};
    },
    
    measuramentsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
