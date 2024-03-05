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

        public Task Create(TaskToDo newTask)
        {
            if (_context.Tasks.Any(taskExistente => taskExistente.TaskName == newTask.TaskName))
            {
                throw new ArgumentException("Esse nome ja existe");
            }
            _context.Tasks.Add(newTask);
            return _context.SaveChangesAsync();
        }

        public async Task<TaskToDo> Delete(string name)
        {
            TaskToDo taskToDelete = await _context.Tasks.FirstOrDefaultAsync(task => task.TaskName == name);
            if (taskToDelete != null)
            {
                _context.Tasks.Remove(taskToDelete);
                await _context.SaveChangesAsync();
            }
            return taskToDelete;
        }
        //Update
        public async Task<IEnumerable<TaskToDo>> GetAllAsync()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<TaskToDo> Read(string name)
        {
            TaskToDo taskToSearch = await _context.Tasks.FirstOrDefaultAsync(task => task.TaskName == name);
            if (name == null)
            {
                throw new ArgumentException("Esse nome não existe");
            }
            return taskToSearch;
        }
        public async Task<TaskToDo> Update(TaskToDo updatedTask, string name)
        {
            TaskToDo taskToUpdate = await _context.Tasks.FirstOrDefaultAsync(t => t.TaskName == name);

            if (taskToUpdate == null)
            {
                throw new ArgumentException("Esse nome não existe");
            }

            taskToUpdate.TaskName = updatedTask.TaskName;
            taskToUpdate.Status = updatedTask.Status;
            taskToUpdate.Description = updatedTask.Description;


            await _context.SaveChangesAsync();

            return taskToUpdate;
        }

    }
}

