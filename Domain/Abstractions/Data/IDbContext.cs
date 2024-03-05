using Domain.Data;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Domain.Abstractions.Data
{
    public interface IDbContext
    {
        DbSet<TaskToDo> Tasks { get; set; }
        Task<int> SaveChangesAsync();

    }
}
