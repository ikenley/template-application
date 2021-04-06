import React, {
  Dispatch,
  SetStateAction,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { Modal, Button } from "react-bootstrap";
import { Institution, SessionOptionSet } from "../types";
import { Column } from "react-table";
import DataGrid from "../shared/DataGrid";
import { SessionContext } from "../session/SessionContext";

type Props = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  optionSet: SessionOptionSet | null;
};

type InstitutionRow = Institution & {
  selected?: boolean;
};

const InstitutionSelectionModal = ({ show, setShow, optionSet }: Props) => {
  const { updateSession } = useContext(SessionContext);
  const handleClose = () => setShow(false);

  // Handle institution selection
  const handleRowClick = useCallback(
    (row: Institution) => {
      updateSession({
        institutionId: row.id,
        institutionName: row.name,
      });
      handleClose();
    },
    [updateSession]
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
      },
      {
        Header: "City",
        accessor: "city",
        width: 200,
        maxWidth: 300,
      },
      {
        Header: "State",
        accessor: "state",
        width: 50,
        maxWidth: 100,
      },
    ],
    []
  );

  return (
    <div className="institution-selection-modal">
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Select Your Institution</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <DataGrid
            columns={columns}
            data={data}
            handleRowClick={handleRowClick}
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
