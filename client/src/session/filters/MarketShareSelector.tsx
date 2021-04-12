import React, { useState, useCallback, useContext, useEffect } from "react";
import {
  Modal,
  Button,
  InputGroup,
  OverlayTrigger,
  Tooltip,
  Alert,
  ButtonGroup,
  Card,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { SessionOptionSet, MarketShareResult } from "../../types";
import { SessionContext } from "../SessionContext";
import marketShareOptions, {
  MarketShareModelOption,
} from "./MarketShareOptions";
import MarketShareGrid from "./MarketShareGrid";

type Props = {
  optionSet: SessionOptionSet | null;
};

const SKELETON_HEIGHT = 45;

const MarketShareSelector = ({ optionSet }: Props) => {
  // sessionModel is derived from Session
  const [sessionModel, setSessionModel] = useState<MarketShareModelOption>(
    marketShareOptions[0]
  );
  // ...tempModel is for temporary edits which do not commit until an update
  const [tempModel, setTempModel] = useState<MarketShareModelOption>(
    marketShareOptions[0]
  );

  const [show, setShow] = useState<boolean>(false);

  const [
    marketShareResult,
    setMarketShareResult,
  ] = useState<MarketShareResult | null>(null);
  // TODO add marketShareResultMap

  const { session, updateSession } = useContext(SessionContext);
  const { isLoading, marketShareModel, institutionId } = session;

  // On session updates, update session selectedModel
  useEffect(() => {
    const selModel = marketShareOptions.find((m) => m.id === marketShareModel);
    if (selModel) {
      setSessionModel(selModel);
      setTempModel(selModel);
    }
  }, [marketShareModel]);

  // On tempModel change, update MarketShareRows
  useEffect(() => {
    setMarketShareResult(null);

    if (isLoading) {
      return;
    }

    axios
      .get(`/api/marketshare/${tempModel.id}/${institutionId}`)
      .then((res) => {
        setMarketShareResult(res.data);
      });
  }, [tempModel, isLoading, institutionId]);

  const handleOpen = useCallback(() => {
    setShow(true);
  }, [setShow]);

  const handleClose = useCallback(() => {
    setShow(false);
    // Reset model on close
    setTempModel(sessionModel);
  }, [setShow, setTempModel, sessionModel]);

  const updateMarketShare = useCallback(() => {
    updateSession({
      marketShareModel: tempModel.id,
    });
    handleClose();
  }, [updateSession, handleClose, tempModel]);

  const handleModelSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const nextTempModel = marketShareOptions.find(
        (opt) => opt.id === parseInt(e.currentTarget.value)
      );
      if (nextTempModel) {
        setTempModel(nextTempModel);
      }
    },
    [setTempModel]
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
        <Button
          className="form-control d-flex justify-content-between"
          size="lg"
          variant="outline-dark"
          block
          onClick={handleOpen}
        >
          <span>{sessionModel.name}</span>
          <span>
            <i className="fas fa-bars"></i>
          </span>
        </Button>
      </InputGroup>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Select Market Share Model</Modal.Title>
          <span className="d-lg-none">
            <Button variant="primary" onClick={updateMarketShare}>
              Update
            </Button>
          </span>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Alert variant="dark">
              Donec dictum aliquam suscipit. Vivamus dignissim pharetra enim at
              congue. Quisque eleifend et justo pulvinar aliquet. Curabitur
              pulvinar urna tortor, varius dignissim ante facilisis a. Nam
              posuere lacus quis ultrices efficitur.
            </Alert>
            <div className="model-selection-toolbar ">
              <InputGroup size="lg">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    Market Share Model
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="market-share-model-button">
                          Proin dapibus nisl id massa varius, mattis blandit
                          metus maximus. Duis eu massa vitae ligula ultrices
                          laoreet. Nulla fermentum elit eget lobortis mollis. Ut
                          metus velit, vulputate quis tincidunt sed, condimentum
                          ultricies tellus. Etiam interdum porttitor libero
                          volutpat mattis. Nullam consequat mi non nisl
                          pellentesque, non suscipit lacus aliquet. Mauris ac
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
                  className="form-control d-flex justify-content-between"
                  size="lg"
                  as="select"
                  onChange={handleModelSelect}
                  value={tempModel.id}
                >
                  {marketShareOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </Form.Control>
              </InputGroup>
            </div>
            <div className="model-body my-3">
              <Row className="align-it">
                <Col lg={4}>
                  <div className="d-flex justify-content-center h-100">
                    <Card>
                      <Card.Img variant="top" src={tempModel.img} />
                      <Card.Body>
                        <Card.Title>{tempModel.name}</Card.Title>
                        <Card.Text>{tempModel.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
                <Col lg={8}>
                  <div className="mt-3 mt-lg-0">
                    <MarketShareGrid result={marketShareResult} />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={updateMarketShare}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MarketShareSelector;
