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