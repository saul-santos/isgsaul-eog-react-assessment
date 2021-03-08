export const NUMBER_OF_READINGS_PER_HALF_HOUR = 1228;

type TableMapItemProps = {
  dataKey: string
  name: string
  unit: string
  color: string
};

export const TABLE_MAP: { [key: string]: TableMapItemProps } = {
  flareTemp: { dataKey: 'flareTemp', name: 'flareTemp', unit: 'f', color: '#D35400' },
  oilTemp: { dataKey: 'oilTemp', name: 'oilTemp', unit: 'f', color: '#212F3D' },
  waterTemp: { dataKey: 'waterTemp', name: 'waterTemp', unit: 'f', color: '#2471A3' },
  tubingPressure: { dataKey: 'tubingPressure', name: 'tubingPressure', unit: 'psi', color: '#138D75' },
  casingPressure: { dataKey: 'casingPressure', name: 'casingPressure', unit: 'psi', color: '#884EA0' },
  injValveOpen: { dataKey: 'injValveOpen', name: 'injValveOpen', unit: '%', color: '#229954' },
};