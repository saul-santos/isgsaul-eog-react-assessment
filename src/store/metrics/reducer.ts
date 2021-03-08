import { createSlice, PayloadAction } from 'redux-starter-kit';

export type ApiErrorAction = {
  error: string;
};

export type MeasuramentQueryInput = {
  metricName: string,
  after: number
};

const initialState = {
  list: [] as string[],
  selectedMetrics:[] as string[],
  multipleMeasuramentsQueryInput: [] as MeasuramentQueryInput[]
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
      const selectedMetrics = action.payload;
      const currentDate = Date.now();
      const ThirtyMinsAgoTime = new Date(currentDate - 30 * 60000).getTime();
    
      const multipleMeasuramentsQueryInput = selectedMetrics.map((metricName: string) => ({
        metricName,
        after: ThirtyMinsAgoTime
      }));

      return { ...state, selectedMetrics, multipleMeasuramentsQueryInput };
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
