import React from "react";
import { RegionRow } from "./types";
import numeral from "numeral";

type Props = {
    years: number[],
    row: RegionRow
}

const ResultGridRow = ({ row, years }: Props) => {

    const { regionName, yearDataPointMap } = row;

    return (
        <tr key={row.regionId}>
            <td>{regionName}</td>
            {years.map(y => (
                <td key={y}>
                    {yearDataPointMap[y] ?
                        numeral(yearDataPointMap[y].enrollment).format('0,0')
                        : null
                    }
                </td>
            ))}
        </tr>
    )
};

export default ResultGridRow;