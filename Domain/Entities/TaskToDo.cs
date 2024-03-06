using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;

namespace Domain.Entities
{
    public class TaskToDo
    {
        [JsonIgnore]
        public Guid Id { get; set; }
        public string? TaskName { get; set; }
        public string? Description { get; set; }
        public Status Status { get; set; }
    }
    public enum Status
    {
        CONCLUIDO,

        NAO_INICIADO,

        EM_ANDAMENTO
    }

    
}
