using Domain.Abstractions.Data;
using Domain.Abstractions.Services;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Domain.Services
{
    public class Service : IService
    {
        private readonly IDbContext _context;

        public Service(IDbContext context)
        {
            _context = context;
        }

        public async Task Create(TaskToDo newTask)
        {
            newTask.Validate();
            if (_context.Tasks.Any(taskExistente => taskExistente.TaskName == newTask.TaskName))
            {
                throw new ArgumentException("Esse nome ja existe");
            }
            _context.Tasks.Add(newTask);
            await _context.SaveChangesAsync();
        }

        public async Task<TaskToDo> Delete(string name)
        {
            TaskToDo? taskToDelete = await FindTaskByNameAsync(name);
            if (taskToDelete == null)
            {
                throw new ArgumentException("Essa Task não existe");
            }
            _context.Tasks.Remove(taskToDelete);
            await _context.SaveChangesAsync();
            return taskToDelete;
        }
        public async Task<IEnumerable<TaskToDo>> GetAllAsync()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<TaskToDo> Read(string name)
        {
            TaskToDo? taskToSearch = await FindTaskByNameAsync(name);
            if (taskToSearch == null)
            {
                throw new ArgumentException("Essa task não existe");
            }

            return taskToSearch;
        }
        private async Task<TaskToDo?> FindTaskByNameAsync(string name)
        {
            return await _context.Tasks.FirstOrDefaultAsync(task =>
                task.TaskName.Equals(name, StringComparison.OrdinalIgnoreCase)
            );
        }
        public async Task<TaskToDo> ReadById(Guid id)
        {
            TaskToDo? taskToSearch = await _context.Tasks.FindAsync(id);
            if (taskToSearch == null)
            {
                throw new ArgumentException("Essa task não existe");
            }
            return taskToSearch;
        }
        public async Task<TaskToDo> Update(TaskToDo actualTask, string name)
        {
            actualTask.Validate();
            TaskToDo? taskToUpdate = await FindTaskByNameAsync(name);
            if (taskToUpdate == null)
            {
                throw new ArgumentException("Esse nome não existe");
            }

            taskToUpdate.TaskName = actualTask.TaskName;
            taskToUpdate.Status = actualTask.Status;
            taskToUpdate.Description = actualTask.Description;


            await _context.SaveChangesAsync();

            return taskToUpdate;
        }

    }
}

