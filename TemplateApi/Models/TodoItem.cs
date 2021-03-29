using System;

namespace TemplateApi.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }
        public DateTime CreatedTimestamp { get; set; }
    }
}
