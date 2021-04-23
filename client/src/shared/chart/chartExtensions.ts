import numeral from "numeral";
import { merge } from "lodash";

type CreateScalesOptions = {
  x?: AxisOptions;
  y?: AxisOptions;
};

type AxisOptions = {
  numeralFormat?: string;
  label?: string;
};

export const createScales = (
  options: CreateScalesOptions,
  overrideScales: any = {}
) => {
  const { x, y } = options;

  const defaultScales = {
    xAxes: createAxes(x),
    yAxes: createAxes(y),
  };

  return merge(defaultScales, overrideScales);
};

const createAxes = (options: AxisOptions | undefined) => {
  const { numeralFormat, label } = options || {};

  return [
    {
      scaleLabel: {
        display: label ? true : false,
        labelString: label,
      },
      ticks: {
        callback: (value: any) => {
          return formatNumber(value, numeralFormat);
        },
      },
      gridLines: {
        drawOnChartArea: false,
      },
    },
  ];
};

const formatNumber = (value: any, numeralFormat: string | undefined) => {
  if (numeralFormat) {
    return numeral(value).format(numeralFormat);
  }
  return value;
};
