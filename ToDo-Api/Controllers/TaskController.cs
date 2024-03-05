using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Domain.Abstractions.Services;
using Domain.Data;
using Domain.Abstractions.Data;
using Domain.Services;
namespace ToDoProject.Controllers;

[ApiController]
[Route("")]
[EnableCors]
public class TaskController : ControllerBase
{
    private readonly IDbContext _context;
    private readonly IService _service;

    public TaskController(IService service, IDbContext context)
    {
        _service = service;
        _context = context;
    }

    [HttpGet("api/task-list")]
    public ActionResult<IEnumerable<TaskToDo>> GetAllTasks()
    {
        var result = _service.GetAllAsync();
        return Ok(result);
    }
    [HttpGet("api/task-list/{name}")]
    public ActionResult<IEnumerable<TaskToDo>> GetTaskByName(string name)
    {
        var taskToDo = _service.Read(name);
        return Ok(taskToDo);
    }

    [HttpPost("api/tasks")]
    public ActionResult<TaskToDo> PostTask(TaskToDo newTask)
    {
        _service.Create(newTask);
        CreatedAtAction(nameof(GetTaskByID), new { id = newTask.Id }, newTask);
        return Ok(newTask);
    }

    [HttpGet("api/tasks/{id}")]
    public async Task<ActionResult<TaskToDo>> GetTaskByID(Guid id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null)
        {
            return NotFound();
        }
        return task;
    }

    [HttpPut("api/tasks/{name}")]
    public async Task<IActionResult> UpdateTask(string name, [FromBody] TaskToDo task)
    {
        Task<TaskToDo> updatedTask = _service.Update(task, name);
        if (updatedTask != null)
        {

            if (updatedTask == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _context.SaveChangesAsync();

            return new ObjectResult(updatedTask);
        }
        else
        {
            return BadRequest(ModelState);
        }
    }

    /*
    [HttpPatch("api/tasks/{id}")]
    public async Task<IActionResult> UpdateTask(long id, Task task){
        if(id != task.Id){
            return NotFound();
        }

        _context.Entry(task).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        if(_context.Tasks.Any(taskExistente=>taskExistente.TaskName == task.TaskName && taskExistente.Id != task.Id))
          throw new Exception("Registro duplicado");
        try{
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException){
            if(!TaskExists(id)){
                return NotFound();
            }throw;
        }
        return NoContent();
    }
    */
    [HttpDelete("api/tasks/{name}")]
    public async Task<ActionResult> DeleteTaskAsync(string name)
    {
        _service.Delete(name);
        await _context.SaveChangesAsync();
        return Ok();
    }
}