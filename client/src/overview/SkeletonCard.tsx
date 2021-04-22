import React from "react";
import { Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card mb-1">
      <Card className="h-100" style={{ minHeight: "170px" }}>
        <Card.Body className="text-center d-flex flex-column justify-content-between">
          <Card.Title>
            <Skeleton />
            <Skeleton />
          </Card.Title>
          <Card.Text>
            <span className="h3">
              <Skeleton />
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SkeletonCard;
