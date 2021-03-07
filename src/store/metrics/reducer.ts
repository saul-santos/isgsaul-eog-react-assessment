import { createSlice, PayloadAction } from 'redux-starter-kit';

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  list: [] as string[],
  selectedMetrics:[] as string[]
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricsDataRecevied: (state, action: PayloadAction<string[]>) => {
      state.list = action.payload;
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
    
    setSelectedMetrics: (state, action: PayloadAction<string[]>) => {
      state.selectedMetrics = action.payload;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
