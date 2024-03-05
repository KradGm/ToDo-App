using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Domain.Entities
{
    public class TaskToDo
    {
        public Guid Id { get; set; }
        public string? TaskName { get; set; }
        public string? Description { get; set; }
        public Status Status { get; set; }
        public void Validate()
        {
            if (string.IsNullOrEmpty(TaskName))
                throw new ArgumentException("TaskName não pode ser vazio");
        }
    }
    public enum Status
    {
        CONCLUIDO,

        NAO_INICIADO,

        EM_ANDAMENTO
    }

    
}
