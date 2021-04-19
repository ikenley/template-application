import React from "react";
import { Col, Form } from "react-bootstrap";
import useSessionOptionSet from "./useSessionOptionSet";
import InstitutionSelector from "./InstitutionSelector";
import MarketShareSelector from "./MarketShareSelector";
import RegionSelector from "./RegionSelector";

type Props = {
  allowMultiInstitutions?: boolean;
  showRegions?: boolean;
};

const FilterPanel = ({ showRegions, allowMultiInstitutions }: Props) => {
  const optionSet = useSessionOptionSet();

  return (
    <div className="filter-panel">
      <Form>
        <Form.Row>
          <Col lg={showRegions ? 4 : 6} className="mb-2">
            <InstitutionSelector
              optionSet={optionSet}
              isMultiple={allowMultiInstitutions === true}
            />
          </Col>
          <Col lg={showRegions ? 5 : 6} className="mb-2">
            <MarketShareSelector optionSet={optionSet} />
          </Col>
          {showRegions ? (
            <Col lg={3} className="mb-2">
              <RegionSelector optionSet={optionSet} />
            </Col>
          ) : null}
        </Form.Row>
      </Form>
    </div>
  );
};

export default FilterPanel;
