
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    /// <summary>
    /// A region. Typically one or mores states
    /// </summary>
    public class Region
    {
        public const int AllRegionsId = 0;
        public const string AllRegionsName = "All Regions";
        /// <summary>
        /// Foreign country region
        /// </summary>
        public const int Foreign = 90;

        public int Id { get; set; }

        public string Name { get; set; }

        public string LongName { get; set; }
    }
}