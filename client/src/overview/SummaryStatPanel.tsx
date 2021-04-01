import React, { useMemo } from "react";
import { OverviewResult } from "./types";
import { Row, Col } from "react-bootstrap";
import numeral from "numeral";
import SummaryStatCard from "./SummaryStatCard";

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

  if (!result || !yearRanges) {
    return null;
  }

  const {
    observedAverageAnnualGrowth,
    predictedAverageAnnualGrowth,
    projectedChange,
  } = result;
  const { minObserved, maxObserved, minPredicted, maxPredicted } = yearRanges;

  return (
    <div className="summary-stat-panel mt-3">
      <Row>
        <Col lg={true}>
          <SummaryStatCard
            title={`Average Annual Growth`}
            subtitle={`${minObserved}-${maxObserved}`}
            body={`${numeral(observedAverageAnnualGrowth).format("0.00%")}`}
            isNegative={observedAverageAnnualGrowth < 0}
          />
        </Col>
        <Col lg={true}>
          <SummaryStatCard
            title={`Projected Average Annual Growth ${minPredicted}-${maxPredicted}`}
            body={`${numeral(predictedAverageAnnualGrowth).format("0.00%")}`}
            isNegative={predictedAverageAnnualGrowth < 0}
          />
        </Col>
        <Col lg={true}>
          <SummaryStatCard
            title={`Projected Change ${maxObserved}-${maxPredicted}`}
            body={`${numeral(projectedChange).format("0.00%")}`}
            isNegative={projectedChange < 0}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SummaryStatPanel;
