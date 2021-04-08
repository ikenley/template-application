// Session
export type Session = {
    isLoading: boolean;
    sessionId: string;
    institutionId: number;
    institutionName: string;
    regionId: number;
    regionName: string;
    marketShareModel: number;
};

export type UpdateSessionParams = {
    sessionId?: string;
    institutionId?: number;
    institutionName?: string;
    regionId?: number;
    regionName?: string;
    marketShareModel?: number;
};

export type SessionOptionSet = {
    institutions: Institution[];
    regions: Region[];
}

export type Institution = {
    id: number;
    name: string;
    city: string;
    state: string;
    zip: string;
}

export type Region = {
    id: number;
    name: string;
}

// Results
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

export type MarketShareResult = {
    regions: Region[];
    marketShareRowMap: { [key: number]: { [key: number]: MarketShareRow } }
}

export type MarketShareRow = {
    year: number;
    regionId: number;
    marketShare: number;
}