import React, {
  Dispatch,
  SetStateAction,
  useState,
  useMemo,
  useCallback,
  useContext,
} from "react";
import {
  Modal,
  Button,
  InputGroup,
  OverlayTrigger,
  Tooltip,
  Form,
} from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { Institution, SessionOptionSet } from "../../types";
import { Column } from "react-table";
import { SessionContext } from "../../session/SessionContext";
import marketShareOptions from "./MarketShareOptions";

type Props = {
  optionSet: SessionOptionSet | null;
};

const SKELETON_HEIGHT = 45;

const MarketShareSelector = ({ optionSet }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const { session, updateSession } = useContext(SessionContext);
  const { isLoading, marketShareModel } = session;

  console.log("MarketShareSelector:session", session);

  const handleOpen = useCallback(() => {
    setShow(true);
  }, [setShow]);

  const handleClose = useCallback(() => {
    setShow(false);
  }, [setShow]);

  // Handle institution selection
  const handleRowClick = useCallback(
    (row: Institution) => {
      handleClose();
    },
    [updateSession, handleClose]
  );

  const handleMarketShareChange = useCallback(
    (e: any) => {
      const msModel = parseInt(e.target.value);

      updateSession({
        marketShareModel: msModel,
      });
    },
    [session]
  );

  if (isLoading) {
    return (
      <div className="market-share-selector">
        <Skeleton height={SKELETON_HEIGHT} />
      </div>
    );
  }

  return (
    <div className="market-share-selector">
      <InputGroup size="lg">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            Market Share Model
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="market-share-model-button">
                  Proin dapibus nisl id massa varius, mattis blandit metus
                  maximus. Duis eu massa vitae ligula ultrices laoreet. Nulla
                  fermentum elit eget lobortis mollis. Ut metus velit, vulputate
                  quis tincidunt sed, condimentum ultricies tellus. Etiam
                  interdum porttitor libero volutpat mattis. Nullam consequat mi
                  non nisl pellentesque, non suscipit lacus aliquet. Mauris ac
                  quam lacus.
                </Tooltip>
              }
            >
              <span className="ml-1">
                <i className="fas fa-info-circle"></i>
              </span>
            </OverlayTrigger>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          as="select"
          value={marketShareModel}
          onChange={handleMarketShareChange}
        >
          {marketShareOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </Form.Control>
      </InputGroup>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Select Your Institution</Modal.Title>
        </Modal.Header>

        <Modal.Body>TODO</Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MarketShareSelector;
