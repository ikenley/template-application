import React, { useMemo } from "react";
import { OverviewResult } from "./types";
import { Line } from "react-chartjs-2";
import { keyBy } from "lodash";

type Props = {
  result: OverviewResult | null;
};

const OverviewChart = ({ result }: Props) => {
  //const { regionIds, years, regionRows } = result;

  // Converts DataPoint[] array into chart.js data format
  // Fills in missing categories with null
  const mapPointsToDataset = (years: number[], dataPoints: any[]) => {
    const yearMap = keyBy<any>(dataPoints, "year");
    const dataSet: number[] = [];
    years.forEach((year) => {
      const point = yearMap[year];
      const value = point && point.enrollment >= 0 ? point.enrollment : null;
      dataSet.push(value);
    });
    return dataSet;
  };

  const chartDataProps = useMemo(() => {
    if (!result) {
      return null;
    }

    const { years, observedPoints, predictedPoints } = result;

    const observedData = mapPointsToDataset(years, observedPoints);
    const predictedData = mapPointsToDataset(years, predictedPoints);

    const chartData = {
      labels: years,
      datasets: [
        {
          label: "Reported",
          fill: false,
          backgroundColor: "#00355f",
          borderColor: "#00355f",
          data: observedData,
        },
        {
          label: "Projected",
          fill: false,
          backgroundColor: "#ed8b00",
          borderColor: "#ed8b00",
          data: predictedData,
        },
      ],
    };

    return chartData;
  }, [result]);

  if (!result) {
    return null;
  }

  return (
    <div className="overview-chart mt-3">
      <Line
        options={{
          maintainAspectRatio: false,
          legend: { position: "bottom" },
          title: {
            display: true,
            fontSize: 16,
            text: "First-time Fall Enrollments",
          },
        }}
        height={300}
        data={chartDataProps}
      />
    </div>
  );
};

export default OverviewChart;
