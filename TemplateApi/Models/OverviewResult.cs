using System;
using System.Collections.Generic;

namespace TemplateApi.Models
{
    public class OverviewResult
    {
        public List<int> Years { get; set; }

        /// <summary>
        /// Region ids sorted by enrollment descending
        /// </summary>
        /// <value></value>
        public List<int> RegionIds { get; set; }

        public List<DataPoint> ObservedPoints { get; set; }
        public List<DataPoint> PredictedPoints { get; set; }

        public List<RegionRow> RegionRows { get; set; }

        public double ObservedAverageAnnualGrowth { get; set; }
        public double PredictedAverageAnnualGrowth { get; set; }
        public double ProjectedChange { get; set; }
    }

    public class RegionRow
    {
        public int RegionId { get; set; }
        public string RegionName { get; set; }
        public Dictionary<int, DataPoint> YearDataPointMap { get; set; }
    }
}