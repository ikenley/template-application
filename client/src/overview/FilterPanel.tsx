import React from "react";
import {
  Col,
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

const FilterPanel = () => {
  return (
    <div className="filter-panel">
      <Form>
        <Form.Row>
          <Col lg={true} className="mb-2">
            <Form.Control as="select" size="lg">
              <option>EAB University</option>
            </Form.Control>
          </Col>
          <Col lg={true} className="mb-2">
            <InputGroup size="lg">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  Market Share Model
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="market-share-model-button">
                        Proin dapibus nisl id massa varius, mattis blandit metus
                        maximus. Duis eu massa vitae ligula ultrices laoreet.
                        Nulla fermentum elit eget lobortis mollis. Ut metus
                        velit, vulputate quis tincidunt sed, condimentum
                        ultricies tellus. Etiam interdum porttitor libero
                        volutpat mattis. Nullam consequat mi non nisl
                        pellentesque, non suscipit lacus aliquet. Mauris ac quam
                        lacus.
                      </Tooltip>
                    }
                  >
                    <span className="ml-1">
                      <i className="fas fa-info-circle"></i>
                    </span>
                  </OverlayTrigger>
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
