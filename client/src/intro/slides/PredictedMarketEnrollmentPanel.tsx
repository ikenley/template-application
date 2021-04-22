import React, { useEffect, useState, useMemo } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import Skeleton from "react-loading-skeleton";
import { useInView } from "react-intersection-observer";
import CardHeader from "../CardHeader";
import { RegionDataPoint, PredictedMarketEnrollment } from "../../types";
import { PrimaryBlue } from "../../shared/Colors";
import RegionLabel from "./RegionLabel";

type Props = {
  region: RegionDataPoint | null;
};

const TITLE = "Estimated College-bound High School Graduates";

const PredictedMarketEnrollmentPanel = ({ region }: Props) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [dataPoints, setDataPoints] = useState<
    PredictedMarketEnrollment[] | null
  >(null);

  useEffect(() => {
    if (!inView || !region) {
      return;
    }

    setDataPoints(null);

    axios
      .get(`/api/marketinfo/predicted-enrollment/${region.id}`)
      .then((res) => {
        setDataPoints(res.data);
      });
  }, [inView, region]);

  const chartDataProps = useMemo(() => {
    if (!dataPoints) {
      return null;
    }

    return {
      labels: dataPoints.map((d) => d.year),
      datasets: [
        {
          fill: false,
          backgroundColor: PrimaryBlue,
          borderColor: PrimaryBlue,
          spanGaps: 1,
          numeralFormat: "0,0.0a",
          label: TITLE,
          data: dataPoints.map((d) => d.enrollment),
        },
      ],
    };
  }, [dataPoints]);

  return (
    <div className="predicted-market-enrollment-panel" ref={ref}>
      <Card>
        <CardHeader>
          Enrollment Projections for <RegionLabel region={region} />
        </CardHeader>
        <Card.Body className="bg-white">
          {dataPoints ? (
            <Line
              redraw={inView}
              options={{
                maintainAspectRatio: false,
                legend: { display: false },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        callback: (value: any) => {
                          return numeral(value).format("0,0a");
                        },
                      },
                    },
                  ],
                },
                title: {
                  display: true,
                  fontSize: 16,
                  text: TITLE,
                },
              }}
              height={300}
              data={chartDataProps}
            />
          ) : (
            <Skeleton height={300} />
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default PredictedMarketEnrollmentPanel;
