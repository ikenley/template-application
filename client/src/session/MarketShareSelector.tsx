import React, { useState, useCallback, useContext, useEffect } from "react";
import {
  Modal,
  Button,
  InputGroup,
  OverlayTrigger,
  Tooltip,
  Alert,
  Form,
} from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import {
  SessionOptionSet,
  MarketShareModelOption,
  UpdateSessionParams,
} from "../types";
import { SessionContext } from "./SessionContext";
import marketShareOptions from "./MarketShareOptions";
import MarketShareResultPanel from "./MarketShareResultPanel";
import CustomMarketSharePanel from "./CustomMarketSharePanel";
import MarketShareModel from "./MarketShareModel";

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
  const [tempCustomOptionMap, setTempCustomOptionMap] = useState<{
    [key: number]: number;
  }>({});

  const [show, setShow] = useState<boolean>(false);

  const { session, updateSession } = useContext(SessionContext);
  const {
    isLoading,
    marketShareModel,
    institutionId,
    customMarketShareOptionMap,
  } = session;

  // On session updates, update session selectedModel
  useEffect(() => {
    const selModel = marketShareOptions.find((m) => m.id === marketShareModel);
    if (selModel) {
      setSessionModel(selModel);
      setTempModel(selModel);
    }
    setTempCustomOptionMap(customMarketShareOptionMap);
  }, [marketShareModel, customMarketShareOptionMap]);

  const handleOpen = useCallback(() => {
    setShow(true);
  }, [setShow]);

  const handleClose = useCallback(() => {
    setShow(false);
    // Reset model on close
    setTempModel(sessionModel);
  }, [setShow, setTempModel, sessionModel]);

  const updateMarketShare = useCallback(() => {
    const updateParams: UpdateSessionParams = {
      marketShareModel: tempModel.id,
    };

    if (tempModel.id === MarketShareModel.Custom) {
      updateParams.customMarketShareOptionMap = tempCustomOptionMap;
    }

    updateSession(updateParams);
    handleClose();
  }, [updateSession, handleClose, tempModel, tempCustomOptionMap]);

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

  const handleCustomOptionChange = useCallback(
    (optionMap: any) => {
      setTempCustomOptionMap(optionMap);
    },
    [setTempCustomOptionMap]
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
          <InputGroup.Text id="mk-share-selector-input-group">
            <span className="d-inline d-md-none">Scenario</span>
            <span className="d-none d-md-inline">Market Share Scenario</span>
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
      <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Select Market Share Scenario</Modal.Title>
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
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="d-block d-md-none">
                  Market Share Scenario
                </Form.Label>
                <InputGroup size="lg">
                  <InputGroup.Prepend className="d-none d-md-inline-block">
                    <InputGroup.Text id="model-selection-toolbar-input-group-text">
                      Market Share Scenario
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="market-share-model-button">
                            Proin dapibus nisl id massa varius, mattis blandit
                            metus maximus. Duis eu massa vitae ligula ultrices
                            laoreet. Nulla fermentum elit eget lobortis mollis.
                            Ut metus velit, vulputate quis tincidunt sed,
                            condimentum ultricies tellus. Etiam interdum
                            porttitor libero volutpat mattis. Nullam consequat
                            mi non nisl pellentesque, non suscipit lacus
                            aliquet. Mauris ac quam lacus.
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
              </Form.Group>
            </div>
            <div className="model-body my-3">
              {tempModel.id === MarketShareModel.Custom ? (
                <CustomMarketSharePanel
                  isLoading={isLoading}
                  institutionId={institutionId}
                  handleCustomOptionChange={handleCustomOptionChange}
                  sessionOptionMap={tempCustomOptionMap}
                />
              ) : (
                <MarketShareResultPanel
                  isLoading={isLoading}
                  institutionId={institutionId}
                  modelOption={tempModel}
                />
              )}
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
