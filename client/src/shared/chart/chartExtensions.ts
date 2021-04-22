import numeral from "numeral";

export const createScales = (numeralFormat: string, scales: any = {}) => {
  const defaultScales = {
    yAxes: [
      {
        ticks: {
          callback: (value: any) => {
            return numeral(value).format(numeralFormat);
          },
        },
      },
    ],
  };

  return { ...defaultScales, ...scales };
};
