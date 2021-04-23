import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { Line } from "react-chartjs-2";
import { createScales } from "../shared/chart/chartExtensions";
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
          spanGaps: 1,
          numeralFormat: "0,0",
          backgroundColor: Primary.Blue,
          borderColor: Primary.Blue,
          data: observedData,
        },
      ],
    };

    if (!hideBaseline) {
      chartData.datasets.push({
        label: "Baseline Estimate",
        fill: false,
        numeralFormat: "0,0",
        backgroundColor: Primary.Orange,
        borderColor: Primary.Orange,
        borderDash: [5, 5],
        data: baselineData,
      });
    }

    if (!hidePredicted && hasPredicted) {
      chartData.datasets.push({
        label: "Alternate Forecast Scenario",
        fill: false,
        numeralFormat: "0,0",
        backgroundColor: Primary.Teal,
        borderColor: Primary.Teal,
        borderDash: [5, 5],
        data: predictedData,
      });
    }

    return chartData;
  }, [result, hideBaseline, hidePredicted]);

  const options = useMemo(() => {
    return {
      maintainAspectRatio: false,
      legend: { position: "bottom" },
      title: {
        display: true,
        fontSize: 16,
        text: "First-time Fall Enrollments",
      },
      scales: createScales({
        x: { label: "Year" },
        y: { numeralFormat: "0,0", label: "First-Time Fall Enrollments" },
      }),
    };
  }, []);

  return (
    <div className="overview-chart mt-1">
      {result ? (
        <Line options={options} height={300} data={chartDataProps} />
      ) : (
        <Skeleton height={300} />
      )}
    </div>
  );
};

export default OverviewChart;
