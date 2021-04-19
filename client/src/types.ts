import { MarketShareModel } from "./session/MarketShareModel";

// Session
export type Session = {
  isLoading: boolean;
  sessionId: string;
  institutionId: number;
  institutionName: string;
  regionId: number;
  regionName: string;
  marketShareModel: number;
  customMarketShareOptionMap: { [key: number]: number };
  compareInstitutionIds: number[];
};

export type UpdateSessionParams = {
  sessionId?: string;
  institutionId?: number;
  institutionName?: string;
  regionId?: number;
  regionName?: string;
  marketShareModel?: number;
  customMarketShareOptionMap?: { [key: number]: number };
  compareInstitutionIds?: number[];
};

export type SessionOptionSet = {
  institutions: Institution[];
  regions: Region[];
};

export type Institution = {
  id: number;
  name: string;
  city: string;
  state: string;
  zip: string;
  isSelected?: boolean;
};

export type Region = {
  id: number;
  name: string;
};

export type YearSummary = {
  yearRows: YearRow[];
  years: number[];
  firstObserved: number;
  lastObserved: number;
  firstPredicted: number;
  lastPredicted: number;
};

const defaultYearSummary: YearSummary = {
  yearRows: [],
  years: [],
  firstObserved: 0,
  lastObserved: 0,
  firstPredicted: 0,
  lastPredicted: 0,
};

// Results
export type OverviewResult = {
  yearSummary: YearSummary;
  regionIds: number[];
  observedPoints: DataPoint[];
  predictedPoints: DataPoint[];
  regionRows: RegionRow[];
  observedAverageAnnualGrowth: number;
  predictedAverageAnnualGrowth: number;
  projectedChange: number;
};

// Empty overview result. Useful for conditional rendering
export const emptyOverviewResult: OverviewResult = {
  yearSummary: defaultYearSummary,
  regionIds: [],
  observedPoints: [],
  predictedPoints: [],
  regionRows: [],
  observedAverageAnnualGrowth: 0,
  predictedAverageAnnualGrowth: 0,
  projectedChange: 0,
};

export type RegionRow = {
  regionId: number;
  regionName: string | null;
  yearDataPointMap: { [key: number]: DataPoint };
};

export type DataPoint = {
  year: number;
  regionId: number;
  isForecast: boolean;
  enrollment?: number;
  marketShare?: number;
  population?: number;
  percentChangeFromIndex?: number;
};

export type MarketShareResult = {
  regions: Region[];
  marketShareRowMap: { [key: number]: { [key: number]: MarketShareRow } };
};

export type MarketShareRow = {
  year: number;
  regionId: number;
  marketShare: number;
};

export type MarketShareModelOption = {
  id: MarketShareModel;
  name: string;
  description: string;
  img: string;
};

export type CustomMarketShareResult = {
  regions: Region[];
  optionMap: CustomMarketShareOptionMap;
};

export type CustomMarketShareOptionMap = {
  [key: number]: CustomMarketShareOption[];
};

export type CustomMarketShareOption = {
  optionId: number;
  marketShare: number;
};

export type CustomMarketShareRow = {
  regionId: number;
  regionName: string;
  selOption: CustomMarketShareOption;
  options: CustomMarketShareOption[];
  minOptionId: number;
  maxOptionId: number;
};

export type YearRow = {
  year: number;
  isPredicted: boolean;
};

export type MarketInfoResult = {
  yearSummary: YearSummary;
  marketInfoRows: MarketInfoRow[];
};

// Empty overview result. Useful for conditional rendering
export const emptyMarketInfoResult: MarketInfoResult = {
  yearSummary: defaultYearSummary,
  marketInfoRows: [],
};

export type MarketInfoRow = {
  regionId: number;
  regionName: string;
  enrollment: number;
  enrollmentShare: number;
  pminYear: number;
  pminMarketEnrollment: number;
  pmaxYear: number;
  pmaxMarketEnrollment: number;
  predictedMarketGrowth: number;
};

export type ComparisonResult = {
  yearSummary: YearSummary;
  institutions: Institution[];
  comparisonRows: ComparisonRow[];
};

export const emptyComparisonResult: ComparisonResult = {
  yearSummary: defaultYearSummary,
  institutions: [],
  comparisonRows: [],
};

export type ComparisonRow = {
  year: number;
  hasData: boolean;
  dataPoints: DataPoint[];
};
