
using System;
using System.Collections.Generic;

namespace TemplateApi.Models
{
    /// <summary>
    /// Configuration options for Sessions
    /// </summary>
    public class SessionOptionSet
    {

        public List<Institution> Institutions { get; set; }

        public List<Region> Regions { get; set; }
    }
}