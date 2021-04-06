using System;

namespace TemplateApi.Models
{
    public class Institution
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Zip { get; set; }
    }
}