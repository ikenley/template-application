import React from "react";
import { Card } from "react-bootstrap";

// Step which triggers a callback when it enters/leaves view

type Props = {
  children: any;
};

const CardHeader = ({ children }: Props) => {
  return (
    <Card.Body className="card-header bg-dark text-white">
      <Card.Title className="mb-0">{children}</Card.Title>
    </Card.Body>
  );
};

export default CardHeader;
