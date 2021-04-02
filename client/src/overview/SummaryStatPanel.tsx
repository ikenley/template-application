import React, { useMemo } from "react";
import { Alert } from "react-bootstrap";
import { OverviewResult, emptyOverviewResult } from "./types";
import { Row, Col } from "react-bootstrap";
import numeral from "numeral";
import SummaryStatCard from "./SummaryStatCard";
import SkeletonCard from "./SkeletonCard";
import NumberFormatSpan from "../shared/NumberFormatSpan";

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
    <div className="summary-stat-panel mt-1">
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
      <Alert variant="dark">
        <p>
          Cras at laoreet mi. Suspendisse in ultrices eros. Proin sodales
          consequat vulputate. Suspendisse aliquet rhoncus enim, malesuada
          consequat velit fringilla{" "}
          <NumberFormatSpan
            value={observedAverageAnnualGrowth}
            format="0.00%"
            isLoading={result === null}
            className="font-weight-bold"
          />
          . Integer a pulvinar ligula. Interdum et malesuada fames ac ante ipsum
          primis in faucibus. Sed elementum tristique augue, ac volutpat mauris
          egestas a. Nulla quis lectus{" "}
          <NumberFormatSpan
            value={predictedAverageAnnualGrowth}
            format="0.00%"
            isLoading={result === null}
            className="font-weight-bold"
          />
          .
        </p>
        <p className="mb-0">
          Ut nec varius elit. Cras quis arcu vehicula, viverra dolor sit amet,
          hendrerit massa. Ut semper condimentum neque, vitae ornare tellus
          euismod ac. Phasellus a congue ligula, id mattis sem.
        </p>
      </Alert>
    </div>
  );
};

export default SummaryStatPanel;
