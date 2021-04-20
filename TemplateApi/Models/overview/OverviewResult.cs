using System;
using System.Collections.Generic;

namespace TemplateApi.Models
{
    public class OverviewResult
    {
        public YearSummary YearSummary { get; set; }

        /// <summary>
        /// Region ids sorted by enrollment descending
        /// </summary>
        /// <value></value>
        public List<int> RegionIds { get; set; }

        public OverviewDataset Observed { get; set; }
        public OverviewDataset Predicted { get; set; }

        /// <summary>Baseline forecast</summary>
        public OverviewDataset Baseline { get; set; }

        public DataPoint[] ObservedPoints { get; set; }
        public DataPoint[] PredictedPoints { get; set; }

        public List<RegionRow> RegionRows { get; set; }

        public double? ObservedAverageAnnualGrowth { get; set; }
        public double? PredictedAverageAnnualGrowth { get; set; }
        public double? ProjectedChange { get; set; }
    }

    public class RegionRow
    {
        public int RegionId { get; set; }
        public string RegionName { get; set; }
        public Dictionary<int, DataPoint> YearDataPointMap { get; set; }
    }
}