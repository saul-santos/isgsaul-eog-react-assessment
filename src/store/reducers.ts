import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from './metrics/reducer';
import { reducer as measuramentsReducer } from './measuraments/reducer';

export default {
  weather: weatherReducer,
  metrics: metricsReducer,
  measuraments: measuramentsReducer
};
