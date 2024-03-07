using Domain.Abstractions.Data;
using Domain.Abstractions.Services;
using Domain.Entities;
using Domain.Validators.Entities;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Domain.Services
{
    public class Service : IService
    {
        private readonly IDbContext _context;
        private readonly IValidator<TaskToDo> _validator;

        public Service(IDbContext context, IValidator<TaskToDo> validator)
        {
            _context = context;
            _validator = validator;
        }

        public async Task Create(TaskToDo newTask)
        {
            await _validator.ValidateAndThrowAsync(newTask);
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

        public async Task<TaskToDo> ReadById(long id)
        {
            TaskToDo? taskToSearch = await _context.Tasks.FindAsync(id);
            if (taskToSearch == null)
            {
                throw new ArgumentException("Essa task não existe");
            }
            return taskToSearch;
        }
        public async Task<TaskToDo> Update(TaskToDo updatedTask, string name)
        {
            TaskToDo? taskToUpdate = await FindTaskByNameAsync(name);
            if (taskToUpdate != null)
            {
                await _validator.ValidateAndThrowAsync(updatedTask);
                taskToUpdate.TaskName = updatedTask.TaskName;
                taskToUpdate.Status = updatedTask.Status;
                taskToUpdate.Description = updatedTask.Description;

                await _context.SaveChangesAsync();

                return taskToUpdate;
            }
            throw new ArgumentException("Esse nome não existe");
        }

        public Task<IEnumerable<TaskToDo>> GetTasksToDoByName(string name)
        {
        var tasklist = _context.Tasks.ToList();
        var filterList = new List<TaskToDo>();
        if(tasklist == null){
           throw new ArgumentException("Não existem tasks com esse nome");
        }
         for(int i=0; i<tasklist.Count; i++){
            if(tasklist[i].TaskName != null && tasklist[i].TaskName.ToLower().Contains(name.ToLower())){
                filterList.Add(tasklist[i]);
            }
        }
        return Task.FromResult<IEnumerable<TaskToDo>>(filterList);
        }
    }
}

