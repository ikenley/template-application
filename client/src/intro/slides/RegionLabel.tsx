import React from "react";
import Skeleton from "react-loading-skeleton";
import { RegionDataPoint } from "../../types";

type Props = {
  region: RegionDataPoint | null;
};

const RegionLabel = ({ region }: Props) => {
  return (
    <span className="region-label">
      {region ? (
        <b className="text-secondary">{region.longName}</b>
      ) : (
        <Skeleton width={100} />
      )}
    </span>
  );
};

export default RegionLabel;
