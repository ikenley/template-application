import React from "react";
import { Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card mb-1 h-100">
      <Card className="h-100">
        <Card.Body className="text-center">
          <Card.Title>
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
