using Domain.Abstractions.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Domain.Entities;

namespace Domain.Data
{
    public class DbContextService : DbContext, IDbContext
    {
        public DbContextService(DbContextOptions<DbContextService> options)
        : base(options) { }
        public DbSet<TaskToDo> Tasks
        {get; set;}

        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }
    }
}
