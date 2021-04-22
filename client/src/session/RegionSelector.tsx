import React, { useContext, useMemo, useCallback } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { Region } from "../types";
import SessionContext from "./SessionContext";
import { SessionOptionSet } from "../types";

const SKELETON_HEIGHT = 45;

type Props = {
  optionSet: SessionOptionSet | null;
};

const RegionSelector = ({ optionSet }: Props) => {
  const { session, updateSession } = useContext(SessionContext);
  const { isLoading, regionId, regionName } = session;

  const regions: Region[] = useMemo(() => {
    if (optionSet) {
      return optionSet.regions;
    }

    // If only session loaded, temporarily use list of just selected Region
    if (!isLoading) {
      return [{ id: regionId, name: regionName, longName: "" }];
    }

    return [];
  }, [optionSet, isLoading, regionId, regionName]);

  const handleRegionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const id = parseInt(e.currentTarget.value);
      const name = regions.find((r) => r.id === id)?.name;

      updateSession({ regionId: id, regionName: name });
    },
    [regions, updateSession]
  );

  return (
    <div className="region-selector">
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
    </div>
  );
};

export default RegionSelector;
