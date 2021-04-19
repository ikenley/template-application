
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    public class CompareService : ICompareService
    {
        private readonly DataContext _dataContext;
        private readonly IYearService _yearService;
        private readonly IInstitutionService _institutionService;
        private readonly ISessionService _sessionService;
        private readonly IOverviewResultService _overviewResultService;

        public CompareService(
            DataContext dataContext,
            IYearService yearService,
            IInstitutionService institutionService,
            ISessionService sessionService,
            IOverviewResultService overviewResultService
        )
        {
            _dataContext = dataContext;
            _yearService = yearService;
            _institutionService = institutionService;
            _sessionService = sessionService;
            _overviewResultService = overviewResultService;
        }

        public async Task<ComparisonResult> GetComparisonResultAsync(Guid sessionId)
        {
            var session = await _sessionService.GetSession(sessionId);
            var institutionIds = session.GetInstitutionIds();

            var result = new ComparisonResult();

            result.YearSummary = await _yearService.GetYearSummaryAsync();

            result.Institutions = await _institutionService.GetInstitutionsAsync(institutionIds);

            result.ComparisonRows = await GetComparisonRowsAsync(sessionId, result.YearSummary.Years, institutionIds);

            return result;
        }

        private async Task<List<ComparisonRow>> GetComparisonRowsAsync(Guid sessionId, List<int> years, int[] institutionIds)
        {
            // Get OverviewResult for each Institution
            var overviews = new OverviewResult[institutionIds.Length];
            var yearDataPointMaps = new Dictionary<int, DataPoint>[institutionIds.Length];
            for (int i = 0; i < institutionIds.Length; i++)
            {
                var overview = await _overviewResultService.GetOverviewResultAsync(sessionId, institutionIds[i]);
                yearDataPointMaps[i] = overview.ObservedPoints
                    .Concat(overview.PredictedPoints)
                    .ToDictionary(d => d.Year);
            }

            var rows = new List<ComparisonRow>();
            foreach (int year in years)
            {
                var row = new ComparisonRow { Year = year, DataPoints = new DataPoint[institutionIds.Length] };
                // For each institution, map data point by year
                bool hasData = false;
                for (int i = 0; i < institutionIds.Length; i++)
                {
                    var yearDataPointMap = yearDataPointMaps[i];
                    if (yearDataPointMap.ContainsKey(year))
                    {
                        hasData = true;
                        row.DataPoints[i] = yearDataPointMap[year];
                    }
                    else
                    {
                        row.DataPoints[i] = new DataPoint();
                    }
                }
                row.HasData = hasData;
                rows.Add(row);
            }

            return rows;
        }
    }
}