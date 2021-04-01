export type OverviewResult = {
    years: number[],
    regionIds: number[],
    observedPoints: DataPoint[],
    predictedPoints: DataPoint[],
    regionRows: RegionRow[],
    observedAverageAnnualGrowth: number,
    predictedAverageAnnualGrowth: number,
    projectedChange: number
}

// Empty overview result. Useful for conditional rendering
export const emptyOverviewResult: OverviewResult = {
    years: [],
    regionIds: [],
    observedPoints: [],
    predictedPoints: [],
    regionRows: [],
    observedAverageAnnualGrowth: 0,
    predictedAverageAnnualGrowth: 0,
    projectedChange: 0
};

export type RegionRow = {
    regionId: number,
    regionName: string | null,
    yearDataPointMap: { [key: number]: DataPoint }
}

export type DataPoint = {
    year: number,
    regionId: number,
    isForecast: boolean,
    enrollment?: number,
    marketShare?: number,
    population?: number
}