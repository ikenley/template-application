import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Col, Form, InputGroup, Button } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { SessionOptionSet, Region } from "../../types";
import { SessionContext } from "../../session/SessionContext";
import InstitutionSelectionModal from "./InstitutionSelectionModal";
import MarketShareSelector from "./MarketShareSelector";

const SKELETON_HEIGHT = 45;

const FilterPanel = () => {
  const [optionSet, setOptionSet] = useState<SessionOptionSet | null>(null);
  const [showInstModal, setShowInstModal] = useState(false);
  const sessionContext = useContext(SessionContext);
  const {
    isLoading,
    institutionName,
    regionId,
    regionName,
    //marketShareModel,
  } = sessionContext.session;

  const openShowInstModal = useCallback(() => {
    setShowInstModal(true);
  }, [setShowInstModal]);

  // Get session options
  useEffect(() => {
    axios.get("/api/session/sessionoptionset").then((res) => {
      setOptionSet(res.data);
    });
  }, [setOptionSet]);

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
            {isLoading ? (
              <div className="">
                <Skeleton height={SKELETON_HEIGHT} />
              </div>
            ) : (
              <Button
                className="d-flex justify-content-between"
                size="lg"
                variant="outline-dark"
                block
                onClick={openShowInstModal}
              >
                <span>{institutionName}</span>
                <span>
                  <i className="fas fa-bars"></i>
                </span>
              </Button>
            )}
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
        <InstitutionSelectionModal
          show={showInstModal}
          setShow={setShowInstModal}
          optionSet={optionSet}
        />
      </Form>
    </div>
  );
};

export default FilterPanel;
