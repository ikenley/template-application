import React from "react";
import { Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { Line } from "react-chartjs-2";

const PlaceholderChart = ({ redraw, title }: any) => {
  const hasData = true;

  const chartDataProps = fakeChartData;

  return (
    <div className="placeholder-chart">
      <Card>
        <Card.Body className="bg-dark text-white">
          <Card.Title className="mb-0">{title}</Card.Title>
        </Card.Body>
        <Card.Body>
          {hasData ? (
            <Line
              redraw={redraw}
              options={{
                maintainAspectRatio: false,
                legend: { position: "bottom" },
                title: {
                  display: true,
                  fontSize: 16,
                  text: "[Placeholder chart]",
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

export default PlaceholderChart;

const fakeChartData = {
  labels: [
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
    2022,
    2023,
    2024,
    2025,
    2026,
    2027,
    2028,
    2029,
    2030,
    2031,
    2032,
    2033,
    2034,
    2035,
  ],
  datasets: [
    {
      label: "Reported",
      fill: false,
      backgroundColor: "#002746",
      borderColor: "#002746",
      spanGaps: 1,
      data: [
        1055,
        null,
        1246,
        null,
        1344,
        null,
        1137,
        null,
        1261,
        null,
        1319,
        null,
        1628,
        null,
        1738,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
    },
    {
      label: "Projected",
      fill: false,
      backgroundColor: "#ed8b00",
      borderColor: "#ed8b00",
      data: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        1749,
        1700,
        1724,
        1716,
        1724,
        1716,
        1745,
        1703,
        1648,
        1610,
        1593,
        1580,
        1639,
        1651,
        1613,
        1601,
        1528,
      ],
    },
  ],
};
