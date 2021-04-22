namespace TemplateApi.Models
{
    /// <summary>
    /// A region. Typically one or mores states
    /// </summary>
    public class PredictedMarketEnrollment
    {
        public int RegionId { get; set; }

        public int Year { get; set; }

        public double Enrollment { get; set; }
    }
}