import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { Scatter } from "react-chartjs-2";
import numeral from "numeral";
import { MarketInfoResult, emptyMarketInfoResult } from "../types";

type Props = {
  result: MarketInfoResult | null;
};

const MarketInfoChart = ({ result }: Props) => {
  const { marketInfoRows } = result || emptyMarketInfoResult;

  const { xAxisNumeralFormat, yAxisNumeralFormat } = useMemo(() => {
    return { xAxisNumeralFormat: "0.0%", yAxisNumeralFormat: "0.000%" };
  }, []);

  const chartData = useMemo(() => {
    const dataPoints = marketInfoRows.map((r) => {
      return {
        x: r.predictedMarketGrowth,
        y: r.enrollmentShare,
        name: r.regionName,
      };
    });

    return {
      datasets: [
        {
          data: dataPoints,
          xAxisNumeralFormat,
          yAxisNumeralFormat,
        },
      ],
    };
  }, [marketInfoRows, xAxisNumeralFormat, yAxisNumeralFormat]);

  const options = useMemo(() => {
    const xAxisLabel = "Estimated Demographic Growth";
    const yAxisLabel = "Enrollment Share";

    return {
      maintainAspectRatio: false,
      legend: { display: false },
      title: {
        display: true,
        fontSize: 16,
        text: `${xAxisLabel} vs ${yAxisLabel}`,
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: xAxisLabel,
            },
            ticks: {
              callback: (value: any) => {
                return numeral(value).format(xAxisNumeralFormat);
              },
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: yAxisLabel,
            },
            ticks: {
              callback: (value: any) => {
                return numeral(value).format(yAxisNumeralFormat);
              },
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          title: (points: any, context: any) => {
            const point = points[0];
            const { datasetIndex, index } = point;
            const dataset = context.datasets[datasetIndex];
            const d = dataset.data[index];
            return d.name;
          },
          label: (point: any, context: any) => {
            const { datasetIndex, index } = point;
            const dataset = context.datasets[datasetIndex];
            const { xAxisNumeralFormat, yAxisNumeralFormat } = dataset;
            const d = dataset.data[index];
            const x = numeral(d.x).format(xAxisNumeralFormat);
            const y = numeral(d.y).format(yAxisNumeralFormat);
            return [`${xAxisLabel}: ${x}`, `${yAxisLabel}: ${y}`];
          },
        },
      },
    };
  }, [xAxisNumeralFormat, yAxisNumeralFormat]);

  return (
    <div className="market-info-chart">
      {result ? (
        <Scatter options={options} height={300} data={chartData} />
      ) : (
        <Skeleton height={300} />
      )}
    </div>
  );
};

export default MarketInfoChart;
