import React from "react";
import { Col, Form, InputGroup } from "react-bootstrap";

const FilterPanel = () => {
  return (
    <div className="filter-panel">
      <Form>
        <Form.Row>
          <Col lg={true} className="mb-2">
            <Form.Control as="select" size="lg">
              <option>Rensselaer Polytechnic Institute</option>
            </Form.Control>
          </Col>
          <Col lg={true} className="mb-2">
            <InputGroup size="lg">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  Market Share Model
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control as="select">
                <option>Most Recent Year</option>
              </Form.Control>
            </InputGroup>
          </Col>
          <Col lg={true} className="mb-2">
            <InputGroup size="lg">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Region</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control as="select">
                <option>All Regions</option>
              </Form.Control>
            </InputGroup>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
};

export default FilterPanel;
