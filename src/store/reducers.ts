import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from '../Features/MetricsList/reducer';

export default {
  weather: weatherReducer,
  metricsList: metricsReducer,
};
