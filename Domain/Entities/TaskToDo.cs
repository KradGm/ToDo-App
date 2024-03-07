using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;

namespace Domain.Entities
{
    public class TaskToDo
    {
        public long Id { get; set; }
        public required string TaskName { get; set; }
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
