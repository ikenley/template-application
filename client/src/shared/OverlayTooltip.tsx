import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
type Placement = import("react-overlays/usePopper").Placement;

type Props = {
  id: string;
  placement: Placement;
  tooltip: string;
  children: any;
};

const OverlayTooltip = ({ id, placement, tooltip, children }: Props) => {
  return (
    <OverlayTrigger
      placement={placement}
      overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
    >
      {children}
    </OverlayTrigger>
  );
};

export default OverlayTooltip;
