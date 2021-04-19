import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { ComparisonResult } from "../types";
import {
  PrimaryColor,
  SecondaryColor,
  TertiaryColor,
  QuaternaryColor,
} from "../constants";

type Props = {
  result: ComparisonResult | null;
};

const colors = [PrimaryColor, SecondaryColor, TertiaryColor, QuaternaryColor];

const CompareChart = ({ result }: Props) => {
  const chartDataProps = useMemo(() => {
    if (!result) {
      return null;
    }

    const { comparisonRows, institutions, yearSummary } = result;
    const { years } = yearSummary;

    const chartData: any = {
      labels: years,
      datasets: institutions.map((inst, ix) => {
        const dataPoints = comparisonRows.map((r) => r.dataPoints[ix]);

        return {
          label: `${inst.name} (${inst.id})`,
          fill: false,
          backgroundColor: colors[ix % colors.length],
          borderColor: colors[ix % colors.length],
          spanGaps: 1,
          numeralFormat: "0,0",
          data: dataPoints.map((d) => {
            const pctChange = d.percentChangeFromIndex;
            if (pctChange === null || typeof pctChange === "undefined") {
              return null;
            }
            return pctChange === null ? null : pctChange * 100 + 100;
          }),
          rawDataPoints: dataPoints,
        };
      }),
    };

    return chartData;
  }, [result]);

  const options = useMemo(() => {
    return {
      maintainAspectRatio: false,
      legend: { position: "bottom" },
      title: {
        display: true,
        fontSize: 16,
        text: [
          "First-time Fall Enrollments for Selected Institutions",
          "(Index Year = 100)",
        ],
      },

      tooltips: {
        callbacks: {
          label: (point: any, context: any) => {
            const { datasetIndex, value } = point;
            const dataset = context.datasets[datasetIndex];
            const { label, numeralFormat, rawDataPoints } = dataset;
            const raw = rawDataPoints[point.index];
            const enrollment = numeral(raw.enrollment).format("0,0");
            const pctChange = numeral(value).format(numeralFormat);
            return `${label}: ${pctChange} (${enrollment})`;
          },
        },
      },
    };
  }, []);

  return (
    <div className="market-info-chart">
      {result ? (
        <Line options={options} height={300} data={chartDataProps} />
      ) : (
        <Skeleton height={300} />
      )}
    </div>
  );
};

export default CompareChart;
