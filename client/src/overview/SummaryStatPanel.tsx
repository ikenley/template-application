import React from "react";
import { Alert } from "react-bootstrap";
import { OverviewResult, emptyOverviewResult } from "../types";
import { Row, Col } from "react-bootstrap";
import SummaryStatCard from "./SummaryStatCard";
import SummaryStatScenarioComp from "./SummaryStatScenarioComp";
import SkeletonCard from "./SkeletonCard";
import NumberFormatSpan from "../shared/NumberFormatSpan";

type Props = {
  result: OverviewResult | null;
};

const SummaryStatPanel = ({ result }: Props) => {
  const { observed, predicted, yearSummary } = result || emptyOverviewResult;
  const {
    firstObserved,
    lastObserved,
    firstPredicted,
    lastPredicted,
  } = yearSummary;

  return (
    <div className="summary-stat-panel mt-1">
      <Row>
        <Col lg={true}>
          {result ? (
            <SummaryStatCard
              title={`Average Annual Growth`}
              subtitle={`${firstObserved}-${lastObserved}`}
              body={
                <NumberFormatSpan
                  value={observed.averageAnnualGrowth}
                  format="0.00%"
                  className="h3"
                />
              }
            />
          ) : (
            <SkeletonCard />
          )}
        </Col>
        <Col lg={true}>
          {result ? (
            <SummaryStatCard
              title={`Projected Average Annual Growth ${firstPredicted}-${lastPredicted}`}
              body={
                <SummaryStatScenarioComp
                  result={result}
                  propName="averageAnnualGrowth"
                />
              }
            />
          ) : (
            <SkeletonCard />
          )}
        </Col>
        <Col lg={true}>
          {result ? (
            <SummaryStatCard
              title={`Projected Change ${lastObserved}-${lastPredicted}`}
              body={
                <SummaryStatScenarioComp
                  result={result}
                  propName="projectedChange"
                />
              }
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
            value={observed.averageAnnualGrowth}
            format="0.00%"
            isLoading={result === null}
            loadingWidth={20}
            className="font-weight-bold"
          />
          . Integer a pulvinar ligula. Interdum et malesuada fames ac ante ipsum
          primis in faucibus. Sed elementum tristique augue, ac volutpat mauris
          egestas a. Nulla quis lectus{" "}
          <NumberFormatSpan
            value={predicted.averageAnnualGrowth}
            format="0.00%"
            isLoading={result === null}
            loadingWidth={20}
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
