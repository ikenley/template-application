import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { Line } from "react-chartjs-2";
import { keyBy } from "lodash";
import { Primary } from "../shared/Colors";
import { OverviewResult } from "../types";

type Props = {
  result: OverviewResult | null | undefined;
  hideBaseline?: Boolean;
  hidePredicted?: boolean;
};

const OverviewChart = ({ result, hideBaseline, hidePredicted }: Props) => {
  // Converts DataPoint[] array into chart.js data format
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

    const { yearSummary, observed, predicted, baseline, hasPredicted } = result;
    const { years } = yearSummary;

    const observedData = mapPointsToDataset(
      years,
      observed.aggregatedDataPoints
    );
    const baselineData = mapPointsToDataset(
      years,
      baseline?.aggregatedDataPoints || []
    );
    const predictedData = mapPointsToDataset(
      years,
      predicted.aggregatedDataPoints
    );

    const chartData: any = {
      labels: years,
      datasets: [
        {
          label: "Reported",
          fill: false,
          backgroundColor: Primary.Blue,
          borderColor: Primary.Blue,
          spanGaps: 1,
          data: observedData,
        },
      ],
    };

    if (!hideBaseline) {
      chartData.datasets.push({
        label: "Baseline Estimate",
        fill: false,
        backgroundColor: Primary.Orange,
        borderColor: Primary.Orange,
        data: baselineData,
      });
    }

    if (!hidePredicted && hasPredicted) {
      chartData.datasets.push({
        label: "Alternate Forecast Scenario",
        fill: false,
        backgroundColor: Primary.Teal,
        borderColor: Primary.Teal,
        data: predictedData,
      });
    }

    return chartData;
  }, [result, hideBaseline, hidePredicted]);

  return (
    <div className="overview-chart mt-1">
      {result ? (
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
      ) : (
        <Skeleton height={300} />
      )}
    </div>
  );
};

export default OverviewChart;
