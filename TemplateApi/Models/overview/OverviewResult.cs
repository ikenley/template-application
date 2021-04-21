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

        public bool HasPredicted { get; set; }

        public List<RegionRow> RegionRows { get; set; }

    }

    public class RegionRow
    {
        public int RegionId { get; set; }
        public string RegionName { get; set; }
        public Dictionary<int, DataPoint> YearObservedMap { get; set; }
        public Dictionary<int, DataPoint> YearBaselineMap { get; set; }
        public Dictionary<int, DataPoint> YearPredictedMap { get; set; }

        public RegionRow(int regionId, string regionName)
        {
            RegionId = regionId;
            RegionName = regionName;
            YearObservedMap = new Dictionary<int, DataPoint>();
            YearBaselineMap = new Dictionary<int, DataPoint>();
            YearPredictedMap = new Dictionary<int, DataPoint>();
        }
    }
}