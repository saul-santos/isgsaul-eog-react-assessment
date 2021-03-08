export const metricsQuery = `{
    getMetrics
  }
`;

export const newMeasuramentsQuery = `
  subscription {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;

export const multipleMeasuramentsQuery = `
  query($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
        metric
        at
        value
        unit
      }
    }
  }
`;
