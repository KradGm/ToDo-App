using Domain.Abstractions.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
namespace ToDoProject.Controllers;

[ApiController]
[Route("")]
[EnableCors]
public class TaskController : ControllerBase
{
    private readonly IService _service;

    public TaskController(IService service)
    {
        _service = service;
    }

    [HttpGet("api/task-list")]
    public async Task<ActionResult<IEnumerable<TaskToDo>>> GetAllTasks()
    {
        var result = await _service.GetAllAsync();
        return Ok(result);
    }
    [HttpGet("api/task/{name}")]
    public async Task<ActionResult<IEnumerable<TaskToDo>>> GetTaskByName(string name)
    {
        var taskToDo = await _service.Read(name);
        return Ok(taskToDo);
    }
    [HttpGet("api/task-list/{name}")]
    public async Task<ActionResult<IEnumerable<TaskToDo>>> GetTasksByName(string name)
    {
        var taskToDo = await _service.GetTasksToDoByName(name);
        return Ok(taskToDo);
    }

    [HttpPost("api/tasks")]
    public ActionResult<TaskToDo> PostTask([FromBody] TaskToDo newTask)
    {
        _service.Create(newTask);
        return CreatedAtAction(nameof(GetTaskByID), new { id = newTask.Id }, newTask);
    }

    [HttpGet("api/tasks/{id}")]
    public async Task<ActionResult<TaskToDo>> GetTaskByID(long id)
    {
        var task = await _service.ReadById(id);
        if (task == null)
        {
            return NotFound();
        }
        return task;
    }

    [HttpPut("api/tasks/{name}")]
    public async Task<ActionResult> UpdateTask(string name, [FromBody] TaskToDo task)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        TaskToDo updatedTask = await _service.Update(task, name);

        if (updatedTask == null)
        {
            return NotFound();
        }

        return Ok(updatedTask);

    }

    [HttpDelete("api/tasks/{name}")]
    public async Task<ActionResult<TaskToDo>> DeleteTaskAsync(string name)
    {
        await _service.Delete(name);
        return NoContent();
    }
}