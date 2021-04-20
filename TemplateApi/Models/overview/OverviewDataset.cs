using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;

namespace TemplateApi.Models
{
    /// <summary>
    /// A set of observed/prediected/baseline DataPoints and related stats
    /// </summary>
    public class OverviewDataset
    {
        [JsonIgnore]
        public List<DataPoint> DataPoints { get; set; }
        public List<DataPoint> AggregatedDataPoints { get; set; }

        public double? AverageAnnualGrowth { get; set; }
        public double? ProjectedChange { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dataPoints">Most granular data points</param>
        /// <param name="aggObservedDataPoints">If prediction, aggregated observed data points.</param>
        public OverviewDataset(List<DataPoint> dataPoints, List<DataPoint> observedPoints, int indexYear)
        {
            DataPoints = dataPoints;
            bool isPrediction = observedPoints != null && observedPoints.Count > 0;

            List<DataPoint> aggObservedDataPoints = new List<DataPoint>();
            if (isPrediction)
            {
                ImputePredictedForeignDataPoints(observedPoints, dataPoints);
                aggObservedDataPoints = AggreggateByYear(observedPoints);
            }

            AggregatedDataPoints = AggreggateByYear(DataPoints);
            AverageAnnualGrowth = GetAverageAnnualGrowthRate(AggregatedDataPoints.ToArray());

            CalculatePercentTotalEnrollment(DataPoints, AggregatedDataPoints);

            var indexDataPoint = (isPrediction ? aggObservedDataPoints : AggregatedDataPoints)
                .Where(p => p.Year == indexYear)
                .FirstOrDefault();
            CalculatePercentChangedFromIndex(indexDataPoint, AggregatedDataPoints);

            if (isPrediction)
            {
                ProjectedChange = GetProjectedChange(aggObservedDataPoints, AggregatedDataPoints);
            }
        }

        /// <summary>
        /// Aggreggates points by year
        /// </summary>
        /// <param name="points"></param>
        /// <returns></returns>
        public static List<DataPoint> AggreggateByYear(List<DataPoint> points)
        {
            return points.GroupBy(p => p.Year)
                .Select(g => new DataPoint
                {
                    Year = g.First().Year,
                    RegionId = -1,
                    IsForecast = g.First().IsForecast,
                    Enrollment = Math.Round(g.Sum(f => f.Enrollment) ?? 0),
                    MarketShare = null, // TODO?
                    Population = Math.Round(g.Sum(f => f.Population) ?? 0)
                })
                .OrderBy(p => p.Year)
                .ToList();
        }

        /// <summary>
        /// Generates predicted foreign values using observed foreign data
        /// </summary>
        private void CalculatePercentTotalEnrollment(
            List<DataPoint> allDataPoints,
            IEnumerable<DataPoint> aggregateDataPoints
        )
        {
            // Create map of year => total enrollment
            var yearTotalEnrollmentMap = aggregateDataPoints.ToDictionary(p => p.Year, t => t.Enrollment);

            // For each DataPoint calculate % of total enrollment for that year
            foreach (var point in allDataPoints)
            {
                if (yearTotalEnrollmentMap.ContainsKey(point.Year))
                {
                    double total = yearTotalEnrollmentMap[point.Year] ?? 0;
                    point.PercentTotalEnrollment = total > 0 ? point.Enrollment / total : null;
                }
            }
        }

        /// <summary>
        /// Calculates average annual growth rate for an ordered set of data points
        /// As described in: https://www.investopedia.com/terms/a/aagr.asp
        /// </summary>
        /// <param name="points"></param>
        /// <returns></returns>
        private double? GetAverageAnnualGrowthRate(DataPoint[] points)
        {
            if (points.Length == 0)
            {
                return null;
            }
            else if (points.Length == 1)
            {
                return 0;
            }

            // Calculate growth rate for each year
            var growthRates = new List<double>();
            for (int i = 0, j = 1; j < points.Length; j++)
            {
                if (points[i].Enrollment > 0)
                {
                    double growthRate = points[i].CalculatePercentChange(points[j]) ?? 0;
                    growthRates.Add(growthRate);
                }
            }

            double avgAnnualGrowthRate = growthRates.Sum() / growthRates.Count;
            return avgAnnualGrowthRate;
        }

        /// <summary>
        /// Calculates overall percentage change from last observed point to last predicted point
        /// </summary>
        private double? GetProjectedChange(List<DataPoint> observedPoints, List<DataPoint> predictedPoints)
        {
            if (observedPoints == null
                || observedPoints.Count == 0
                || predictedPoints == null
                || predictedPoints.Count == 0
                || observedPoints[0].Enrollment == 0
            )
            {
                return null;
            }

            var current = predictedPoints.Last();
            var previous = observedPoints.Last();
            double? change = previous.CalculatePercentChange(current);
            return change;
        }

        /// <summary>
        /// Calculates percent changed from baseline year. Assumes all points are in the same region.
        /// </summary>
        private void CalculatePercentChangedFromIndex(DataPoint first, IEnumerable<DataPoint> dataPoints)
        {
            if (first == null || first.Enrollment == null || first.Enrollment == 0)
            {
                return;
            }

            foreach (var point in dataPoints)
            {
                point.PercentChangeFromIndex = first.CalculatePercentChange(point);
            }
        }

        /// <summary>
        /// Generates predicted foreign values using observed foreign data
        /// </summary>
        private void ImputePredictedForeignDataPoints(
            List<DataPoint> observedPoints,
            List<DataPoint> predictedPoints
        )
        {
            // Get most recent year of foreign data
            var latest = observedPoints
                .Where(p => p.RegionId == Region.Foreign)
                .OrderByDescending(p => p.Year)
                .FirstOrDefault();

            if (latest == null)
            {
                return;
            }

            // For each prediction year, add copy of most recent foreign data
            int[] predictedYears = predictedPoints
                .Select(p => p.Year)
                .Distinct()
                .ToArray();
            foreach (int year in predictedYears)
            {
                predictedPoints.Add(new DataPoint
                {
                    Year = year,
                    RegionId = Region.Foreign,
                    IsForecast = true,
                    Enrollment = latest.Enrollment,
                    MarketShare = latest.MarketShare,
                    Population = latest.Population
                });
            }
        }
    }
}