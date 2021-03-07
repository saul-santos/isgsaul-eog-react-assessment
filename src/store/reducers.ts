import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from './metrics/reducer';

export default {
  weather: weatherReducer,
  metrics: metricsReducer,
};
