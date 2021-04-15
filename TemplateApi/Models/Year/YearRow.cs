
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    /// <summary>
    /// A region. Typically one or mores states
    /// </summary>
    [Table("years")]
    public class YearRow
    {
        [Key]
        public int Year { get; set; }

        public bool IsPrediction { get; set; }
    }
}