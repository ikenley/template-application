import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { MarketShareResult, MarketShareModelOption } from "../../types";
import MarketShareGrid from "./MarketShareGrid";

type Props = {
  isLoading: boolean;
  institutionId: number;
  modelOption: MarketShareModelOption;
};

const SKELETON_HEIGHT = 45;

const MarketShareResultPanel = ({
  isLoading,
  institutionId,
  modelOption,
}: Props) => {
  const [result, setResult] = useState<MarketShareResult | null>(null);

  // On tempModel change, update MarketShareRows
  useEffect(() => {
    setResult(null);

    if (isLoading) {
      return;
    }

    axios
      .get(`/api/marketshare/${modelOption.id}/${institutionId}`)
      .then((res) => {
        setResult(res.data);
      });
  }, [modelOption, isLoading, institutionId]);

  if (isLoading) {
    return (
      <div className="market-share-selector">
        <Skeleton height={SKELETON_HEIGHT} />
      </div>
    );
  }

  return (
    <div className="market-share-result-panel">
      <Row>
        <Col lg={4}>
          <div className="d-flex justify-content-center h-100">
            <Card>
              <Card.Img variant="top" src={modelOption.img} />
              <Card.Body>
                <Card.Title>{modelOption.name}</Card.Title>
                <Card.Text>{modelOption.description}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>
        <Col lg={8}>
          <div className="mt-3 mt-lg-0">
            <MarketShareGrid result={result} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MarketShareResultPanel;
