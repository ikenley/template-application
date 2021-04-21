import React from "react";
import { Card } from "react-bootstrap";

type Props = {
  title: string;
  subtitle?: string;
  body: string | React.ReactNode;
};

const SummaryStatCard = ({ title, subtitle, body }: Props) => {
  return (
    <div className="summary-stat-card pb-3 h-100">
      <Card className="h-100">
        <Card.Body className="text-center">
          <Card.Title>
            <span className="text-primary">{title}</span>
            <span className=""> {subtitle}</span>
          </Card.Title>
          {body}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SummaryStatCard;
