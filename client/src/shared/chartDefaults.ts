import { defaults } from "react-chartjs-2";
import numeral from "numeral";

defaults.global.tooltips.callbacks.label = (dataPoint: any, context: any) => {
  const { value, datasetIndex } = dataPoint;
  const { label, numeralFormat } = context.datasets[datasetIndex];
  let displayValue = value;
  if (numeralFormat) {
    displayValue = numeral(value).format(numeralFormat);
  }
  return `${label}: ${displayValue}`;
};
