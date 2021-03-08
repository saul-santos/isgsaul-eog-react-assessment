import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { NUMBER_OF_READINGS_PER_HALF_HOUR } from '../../constants/constants';
import { IState } from '../../store';

const getMeasurements = (state: IState) => state.measurements;
const getSelectedMetrics = (state: IState) => state.metrics.selectedMetrics;

type Measurement = {
  [key: string]: number
};

type TableMapItemProps = {
  dataKey: string
  name: string
  unit: string
  color: string
};

const tableMap: { [key: string]: TableMapItemProps } = {
  flareTemp: { dataKey: 'flareTemp', name: 'flareTemp', unit: 'f', color: '#D35400' },
  oilTemp: { dataKey: 'oilTemp', name: 'oilTemp', unit: 'f', color: '#212F3D' },
  waterTemp: { dataKey: 'waterTemp', name: 'waterTemp', unit: 'f', color: '#2471A3' },
  tubingPressure: { dataKey: 'tubingPressure', name: 'tubingPressure', unit: 'psi', color: '#138D75' },
  casingPressure: { dataKey: 'casingPressure', name: 'casingPressure', unit: 'psi', color: '#884EA0' },
  injValveOpen: { dataKey: 'injValveOpen', name: 'injValveOpen', unit: '%', color: '#229954' },
};

export default () => {
  const measurements = useSelector(getMeasurements);
  const selectedMetrics = useSelector(getSelectedMetrics);
  const [data, setData] = React.useState<Measurement[]>();

  React.useEffect(() => {
    const _data = [];

    for (let i = 0; i < NUMBER_OF_READINGS_PER_HALF_HOUR - 1; i++) {
      const item: { [key: string]: number } = {};

      if (selectedMetrics.length === 0) {
        break;
      }

      selectedMetrics.forEach(selectedMetric => {
        if (measurements[selectedMetric] && measurements[selectedMetric][i]) {
          item[selectedMetric] = measurements[selectedMetric][i].value;

          if (!item.timestamp) {
            item.timestamp = measurements[selectedMetric][i].at;
          }
        }
      });

      _data.push(item);
    }

    setData(_data);
  }, [measurements, selectedMetrics]);

  function formatDate(value: string) {
    if (!value) return '';
    const date = new Date(value);
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  const formatTooltipValues = (value: string, name: string) => ([`${value} ${tableMap[name].unit}`, name]);

  return (
    <LineChart width={800} height={500} data={data} margin={{ top: 32, right: 20, bottom: 5, left: 32 }}>
      {selectedMetrics.map(metric => (
        <Line type="monotone" dataKey={metric} stroke={tableMap[metric].color} key={`line-${metric}`} />
      ))}

      <XAxis dataKey="timestamp" minTickGap={120} tickFormatter={formatDate} />
      <YAxis />

      <Tooltip labelFormatter={formatDate} formatter={formatTooltipValues} />
    </LineChart>
  );
}