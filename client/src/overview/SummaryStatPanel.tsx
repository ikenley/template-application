import React, { useMemo } from "react";
import { OverviewResult, emptyOverviewResult } from "./types";
import { Row, Col } from "react-bootstrap";
import numeral from "numeral";
import SummaryStatCard from "./SummaryStatCard";
import SkeletonCard from "./SkeletonCard";

type Props = {
  result: OverviewResult | null;
};

type YearRanges = {
  minObserved: number;
  maxObserved: number;
  minPredicted: number;
  maxPredicted: number;
};

const SummaryStatPanel = ({ result }: Props) => {
  const yearRanges: YearRanges | null = useMemo(() => {
    if (!result) {
      return null;
    }

    const { observedPoints, predictedPoints } = result;

    if (
      !observedPoints ||
      observedPoints.length === 0 ||
      !predictedPoints ||
      predictedPoints.length === 0
    ) {
      return null;
    }

    const minObserved = observedPoints[0].year;
    const maxObserved = observedPoints[observedPoints.length - 1].year;
    const minPredicted = predictedPoints[0].year;
    const maxPredicted = predictedPoints[predictedPoints.length - 1].year;

    return {
      minObserved,
      maxObserved,
      minPredicted,
      maxPredicted,
    };
  }, [result]);

  const {
    observedAverageAnnualGrowth,
    predictedAverageAnnualGrowth,
    projectedChange,
  } = result || emptyOverviewResult;
  const { minObserved, maxObserved, minPredicted, maxPredicted } =
    yearRanges || {};

  return (
    <div className="summary-stat-panel mt-3">
      <Row>
        <Col lg={true}>
          {result ? (
            <SummaryStatCard
              title={`Average Annual Growth`}
              subtitle={`${minObserved}-${maxObserved}`}
              body={`${numeral(observedAverageAnnualGrowth).format("0.00%")}`}
              isNegative={observedAverageAnnualGrowth < 0}
            />
          ) : (
            <SkeletonCard />
          )}
        </Col>
        <Col lg={true}>
          {result ? (
            <SummaryStatCard
              title={`Projected Average Annual Growth ${minPredicted}-${maxPredicted}`}
              body={`${numeral(predictedAverageAnnualGrowth).format("0.00%")}`}
              isNegative={predictedAverageAnnualGrowth < 0}
            />
          ) : (
            <SkeletonCard />
          )}
        </Col>
        <Col lg={true}>
          {result ? (
            <SummaryStatCard
              title={`Projected Change ${maxObserved}-${maxPredicted}`}
              body={`${numeral(projectedChange).format("0.00%")}`}
              isNegative={projectedChange < 0}
            />
          ) : (
            <SkeletonCard />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SummaryStatPanel;
