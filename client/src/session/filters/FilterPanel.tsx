import React, { useContext, useEffect, useMemo, useCallback } from "react";
import { Col, Form, InputGroup } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { Region } from "../../types";
import { SessionContext } from "../SessionContext";
import useSessionOptionSet from "../useSessionOptionSet";
import InstitutionSelector from "./InstitutionSelector";
import MarketShareSelector from "./MarketShareSelector";

const SKELETON_HEIGHT = 45;

const FilterPanel = () => {
  const optionSet = useSessionOptionSet();
  const sessionContext = useContext(SessionContext);
  const { isLoading, regionId, regionName } = sessionContext.session;

  // Update when session changes
  useEffect(() => {}, [sessionContext]);

  const regions: Region[] = useMemo(() => {
    if (optionSet) {
      return optionSet.regions;
    }

    // If only session loaded, temporarily use list of just selected Region
    if (!sessionContext.session.isLoading) {
      return [{ id: regionId, name: regionName }];
    }

    return [];
  }, [optionSet, sessionContext, regionId, regionName]);

  const handleRegionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const id = parseInt(e.currentTarget.value);
      const name = regions.find((r) => r.id === id)?.name;

      sessionContext.updateSession({ regionId: id, regionName: name });
    },
    [regions, sessionContext]
  );

  return (
    <div className="filter-panel">
      <Form>
        <Form.Row>
          <Col lg={true} className="mb-2">
            <InstitutionSelector optionSet={optionSet} />
          </Col>
          <Col lg={true} className="mb-2">
            <MarketShareSelector optionSet={optionSet} />
          </Col>
          <Col lg={true} className="mb-2">
            {isLoading ? (
              <Skeleton height={SKELETON_HEIGHT} />
            ) : (
              <InputGroup size="lg">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Region</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  as="select"
                  value={regionId}
                  onChange={handleRegionChange}
                >
                  {regions.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </Form.Control>
              </InputGroup>
            )}
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
};

export default FilterPanel;
