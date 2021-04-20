import React, {
  useMemo,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import { Modal, Button, Form, ListGroup, Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { Column } from "react-table";
import { sortBy } from "lodash";
import { Institution, SessionOptionSet } from "../types";
import DataGrid, {
  DefaultColumnFilter,
  SelectColumnFilter,
} from "../shared/grid/DataGrid";
import { SessionContext } from "./SessionContext";

type Props = {
  optionSet: SessionOptionSet | null;
  isMultiple: boolean;
};

type InstitutionRow = Institution & {
  selected?: boolean;
};

const SKELETON_HEIGHT = 45;
const GRID_HEIGHT = 500;
const MAX_MULTI_COUNT = 4;

const InstitutionSelectionModal = ({ optionSet, isMultiple }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [tempInstIds, setTempInstIds] = useState<number[]>([]);
  const { session, updateSession } = useContext(SessionContext);
  const {
    isLoading,
    institutionId,
    institutionName,
    compareInstitutionIds,
  } = session;

  const handleOpen = useCallback(() => {
    setShow(true);
  }, [setShow]);

  const handleClose = useCallback(() => {
    setShow(false);
  }, [setShow]);

  // Update tempInstIds when session changes
  useEffect(() => {
    // Use compareInstitutionIds
    if (compareInstitutionIds && compareInstitutionIds.length) {
      setTempInstIds(compareInstitutionIds);
    } else {
      setTempInstIds([institutionId]); // Default to selected institution
    }
  }, [institutionId, show, compareInstitutionIds]);

  // Handle (single) institution selection
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

  const handleInstCheck = useCallback(
    (inst: Institution) => {
      const { id } = inst;
      let isSelected = !inst.isSelected;
      // Add if selected, else remove
      let tempIds;
      if (isSelected) {
        if (tempInstIds.length >= MAX_MULTI_COUNT) {
          return;
        }
        tempIds = [...tempInstIds, id];
      } else {
        tempIds = tempInstIds.filter((i) => i !== id);
      }
      setTempInstIds(tempIds);
    },
    [tempInstIds, setTempInstIds]
  );

  const institutionRows: InstitutionRow[] = useMemo(() => {
    let rows: InstitutionRow[] = [];

    if (optionSet) {
      rows = optionSet.institutions;

      if (isMultiple) {
        rows = optionSet.institutions.map((inst) => {
          return { ...inst, isSelected: tempInstIds.includes(inst.id) };
        });
      }
    }

    return rows;
  }, [optionSet, isMultiple, tempInstIds]);

  const selInstitutions: InstitutionRow[] = useMemo(() => {
    if (!isMultiple) {
      return [];
    }

    const filteredRows = institutionRows.filter((r) => r.isSelected);
    // Sort by order they were added
    const sortedRows = sortBy(filteredRows, (r) => tempInstIds.indexOf(r.id));

    return sortedRows;
  }, [institutionRows, isMultiple, tempInstIds]);

  const handleUpdateClick = useCallback(() => {
    if (tempInstIds.length === 0 || tempInstIds.length > MAX_MULTI_COUNT) {
      return;
    }

    const first = selInstitutions[0];
    updateSession({
      institutionId: first.id,
      institutionName: first.name,
      compareInstitutionIds: tempInstIds,
    });
    handleClose();
  }, [tempInstIds, selInstitutions, updateSession, handleClose]);

  const columns: Column<InstitutionRow>[] = useMemo(() => {
    const cols: any = [];

    if (isMultiple) {
      cols.push({
        Header: "",
        id: "isSelected",
        accessor: "isSelected",
        width: 50,
        maxWidth: 100,
        disableFilters: true,
        disableSortBy: true,
        Cell: ({ row, value }: any) => {
          const { original } = row;
          return (
            <div className="text-center">
              <Form.Check
                aria-label={original.name}
                checked={value}
                disabled={
                  tempInstIds.length >= MAX_MULTI_COUNT && !original.isSelected
                }
                onChange={() => {}}
              />
            </div>
          );
        },
      });
    }

    cols.push(
      {
        Header: "Name",
        accessor: "name",
        width: 300,
        maxWidth: 500,
        disableSortBy: true,
        Filter: DefaultColumnFilter,
        disableFilters: false,
      },
      {
        Header: "City",
        accessor: "city",
        width: 200,
        maxWidth: 300,
        disableSortBy: true,
        Filter: DefaultColumnFilter,
        disableFilters: false,
      },
      {
        Header: "State",
        accessor: "state",
        width: 100,
        maxWidth: 150,
        disableSortBy: true,
        Filter: SelectColumnFilter,
        disableFilters: false,
      }
    );

    return cols;
  }, [isMultiple, tempInstIds]);

  const buttonToolBar = (
    <div className="text-right">
      <Button
        variant={isMultiple ? "outline-dark" : "primary"}
        onClick={handleClose}
      >
        Close
      </Button>
      {isMultiple ? (
        <Button
          variant="primary"
          className="ml-2"
          onClick={handleUpdateClick}
          disabled={
            tempInstIds.length === 0 || tempInstIds.length > MAX_MULTI_COUNT
          }
        >
          Update
        </Button>
      ) : null}
    </div>
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
      <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
        <Modal.Header>
          <Modal.Title>
            {isMultiple ? "Select Institutions" : "Select Your Institution"}
          </Modal.Title>
          <span className="ml-auto">
            {isMultiple ? (
              buttonToolBar
            ) : (
              <button type="button" className="close" onClick={handleClose}>
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
              </button>
            )}
          </span>
        </Modal.Header>

        <Modal.Body>
          {isMultiple ? (
            <Card className="mb-3">
              <Card.Header className="py-2">
                Selected Institutions{" "}
                <small className="text-muted">({MAX_MULTI_COUNT} max)</small>
              </Card.Header>
              <ListGroup variant="flush">
                {selInstitutions.length ? (
                  selInstitutions.map((inst) => (
                    <ListGroup.Item key={inst.id} className="py-2">
                      <div className="d-flex w-100 justify-content-between align-items-center">
                        <div>
                          {inst.name}, {inst.city} {inst.state}
                        </div>
                        <Button
                          variant="outline-dark"
                          size="sm"
                          onClick={() => {
                            handleInstCheck(inst);
                          }}
                        >
                          <i className="fas fa-minus" />
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item variant="light" className="text-center">
                    None selected
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          ) : null}
          <DataGrid
            columns={columns}
            data={institutionRows}
            handleRowClick={isMultiple ? handleInstCheck : handleRowClick}
            maxHeight={GRID_HEIGHT}
          />
        </Modal.Body>

        <Modal.Footer>{buttonToolBar}</Modal.Footer>
      </Modal>
    </div>
  );
};

export default InstitutionSelectionModal;
