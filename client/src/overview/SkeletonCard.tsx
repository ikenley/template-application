import React from "react";
import classNames from "classnames";
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
            <h3>
              <Skeleton />
            </h3>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SkeletonCard;
