import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from './metrics/reducer';
import { reducer as measurementsReducer } from './measurements/reducer';

export default {
  weather: weatherReducer,
  metrics: metricsReducer,
  measurements: measurementsReducer
};
