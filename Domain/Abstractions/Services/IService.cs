using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Domain.Abstractions.Services
{
    public interface IService
    {
        Task Create(TaskToDo task);
        Task<TaskToDo> Delete(string taskname);
        Task<IEnumerable<TaskToDo>> GetAllAsync();
        Task<TaskToDo> Read(string name);
        Task<TaskToDo> Update(TaskToDo task, string value);
    }
}
