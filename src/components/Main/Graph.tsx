import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { NUMBER_OF_READINGS_PER_HALF_HOUR, TABLE_MAP } from '../../constants/constants';
import { IState } from '../../store';

const getMeasurements = (state: IState) => state.measurements;
const getSelectedMetrics = (state: IState) => state.metrics.selectedMetrics;

type Measurement = {
  [key: string]: number
};

export default () => {
  const measurements = useSelector(getMeasurements);
  const selectedMetrics = useSelector(getSelectedMetrics);
  const [lineChartData, setLineChartData] = React.useState<Measurement[]>();

  React.useEffect(() => {
    const _lineChartData = [];

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

      _lineChartData.push(item);
    }

    setLineChartData(_lineChartData);
  }, [measurements, selectedMetrics]);

  function formatDate(value: string) {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleTimeString();
  }

  const formatTooltipValues = (value: string, name: string) => ([`${value} ${TABLE_MAP[name].unit}`, name]);

  return (
    <LineChart width={800} height={500} data={lineChartData} margin={{ top: 32, right: 20, bottom: 5, left: 32 }}>
      {selectedMetrics.map(metric => (
        <Line type="monotone" dataKey={metric} stroke={TABLE_MAP[metric].color} key={`line-${metric}`} />
      ))}

      <XAxis dataKey="timestamp" minTickGap={120} tickFormatter={formatDate} />
      <YAxis />

      <Tooltip labelFormatter={formatDate} formatter={formatTooltipValues} />
    </LineChart>
  );
}