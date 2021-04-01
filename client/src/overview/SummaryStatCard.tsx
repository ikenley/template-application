import React from "react";
import classNames from "classnames";
import { Card } from "react-bootstrap";

type Props = {
  title: string;
  subtitle?: string;
  body: string;
  isNegative: boolean;
};

const SummaryStatCard = ({ title, subtitle, body, isNegative }: Props) => {
  return (
    <div className="summary-stat-card mb-1 h-100">
      <Card className="h-100">
        <Card.Body className="text-center">
          <Card.Title>
            <span className="text-primary">{title}</span>
            <span className=""> {subtitle}</span>
          </Card.Title>
          <Card.Text
            className={classNames({
              "text-primary": !isNegative,
              "text-danger": isNegative,
            })}
          >
            <h3>{body}</h3>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SummaryStatCard;
