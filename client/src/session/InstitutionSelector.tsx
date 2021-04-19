import React, { useMemo, useCallback, useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { Column } from "react-table";
import { Institution, SessionOptionSet } from "../types";
import DataGrid, {
  DefaultColumnFilter,
  SelectColumnFilter,
} from "../shared/grid/DataGrid";
import { SessionContext } from "./SessionContext";

type Props = {
  optionSet: SessionOptionSet | null;
};

type InstitutionRow = Institution & {
  selected?: boolean;
};

const SKELETON_HEIGHT = 45;
const GRID_HEIGHT = 500;

const InstitutionSelectionModal = ({ optionSet }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const { session, updateSession } = useContext(SessionContext);
  const { isLoading, institutionName } = session;

  const handleOpen = useCallback(() => {
    setShow(true);
  }, [setShow]);

  const handleClose = useCallback(() => {
    setShow(false);
  }, [setShow]);

  // Handle institution selection
  const handleRowClick = useCallback(
    (row: Institution) => {
      updateSession({
        institutionId: row.id,
        institutionName: row.name,
      });
      handleClose();
    },
    [updateSession, handleClose]
  );

  const data: InstitutionRow[] = useMemo(() => {
    return optionSet ? optionSet.institutions : [];
  }, [optionSet]);

  const columns: Column<InstitutionRow>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        width: 300,
        maxWidth: 500,
        Filter: DefaultColumnFilter,
        disableFilters: false,
      },
      {
        Header: "City",
        accessor: "city",
        width: 200,
        maxWidth: 300,
        Filter: DefaultColumnFilter,
        disableFilters: false,
      },
      {
        Header: "State",
        accessor: "state",
        width: 100,
        maxWidth: 150,
        Filter: SelectColumnFilter,
        disableFilters: false,
      },
    ],
    []
  );

  return (
    <div className="institution-selector">
      {isLoading ? (
        <Skeleton height={SKELETON_HEIGHT} />
      ) : (
        <Button
          className="d-flex justify-content-between"
          size="lg"
          variant="outline-dark"
          block
          onClick={handleOpen}
        >
          <span>{institutionName}</span>
          <span>
            <i className="fas fa-bars"></i>
          </span>
        </Button>
      )}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Select Your Institution</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <DataGrid
            columns={columns}
            data={data}
            handleRowClick={handleRowClick}
            maxHeight={GRID_HEIGHT}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InstitutionSelectionModal;
