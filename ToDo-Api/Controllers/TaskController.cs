using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;
namespace ToDoProject.Controllers;

[ApiController]
[Route("api/[controller]")]
[EnableCors]
public class TaskController : ControllerBase
{
    private readonly TaskListContext _context;

    public TaskController(TaskListContext context)
    {
        _context = context;
    }
    [HttpGet("/TaskList")]
    public ActionResult<IEnumerable<Task>> GetAllTasks()
    {
        return _context.Tasks.ToList();
    }

    [HttpPost]
    public async Task<ActionResult<Task>> PostTask(Task task)
    {
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTaskByID), new { id = task.Id }, task);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Task>> GetTaskByID(long id){
        var task = await _context.Tasks.FindAsync(id);
        if(task == null)
        {
            return NotFound();
        }
    return task;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(long id, Task task){
        if(id != task.Id){
            return BadRequest();
        }

        _context.Entry(task).State = Microsoft.EntityFrameworkCore.EntityState.Modified;

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
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTask(long id){
        var taskToDelete = await _context.Tasks.FindAsync(id);
        if(taskToDelete == null){
            return NotFound();
        }

        _context.Tasks.Remove(taskToDelete);
        await _context.SaveChangesAsync();
        return NoContent();
    }
    private bool TaskExists(long id)
    {
        return _context.Tasks.Any(item => item.Id == id);
    }

}