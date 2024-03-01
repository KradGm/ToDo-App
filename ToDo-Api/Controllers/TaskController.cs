using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;
namespace ToDoProject.Controllers;

[ApiController]
[Route("")]
[EnableCors]
public class TaskController : ControllerBase
{
    private readonly TaskListContext _context;

    public TaskController(TaskListContext context)
    {
        _context = context;
    }
    [HttpGet("api/task-list")]
    public ActionResult<IEnumerable<Task>> GetAllTasks()
    {
        return _context.Tasks.ToList();
    }
    [HttpGet("api/task-list/{name}")]
    public  ActionResult<IEnumerable<Task>> GetTaskByName(string name)
    {
        var tasklist = _context.Tasks.ToList();
        var filterList = new List<Task>();
        if(tasklist == null){
           return NotFound(tasklist);
        }
         for(int i=0; i<tasklist.Count; i++){
            if(tasklist[i].TaskName != null && tasklist[i].TaskName.Contains(name)){
                filterList.Add(tasklist[i]);
            }
        }
        return filterList;
    }

    [HttpPost("api/tasks")]
    public async Task<ActionResult<Task>> PostTask(Task newTask)
    {
        
        if(_context.Tasks.Any(taskExistente=>taskExistente.TaskName == newTask.TaskName)){
          //throw new Exception("Registro duplicado");
          throw new ArgumentException("testError");
          }
        _context.Tasks.Add(newTask);
        await _context.SaveChangesAsync();  
        return CreatedAtAction(nameof(GetTaskByID), new { id = newTask.Id }, newTask);
    }
    [HttpGet("api/tasks/{id}")]
    public async Task<ActionResult<Task>> GetTaskByID(long id){
        var task = await _context.Tasks.FindAsync(id);
        if(task == null)
        {
            return NotFound();
        }
    return task;
    }

    [HttpPatch("api/tasks/{id}")]
    public async Task<IActionResult> UpdateTask(long id, [FromBody] Task task)
    {
        var updatedTask = await _context.Tasks.FindAsync(id);
    if (updatedTask != null)
    {

        if (updatedTask == null)
        {
            return NotFound();
        }

        if(task.TaskName !=null){
            updatedTask.TaskName = task.TaskName;
        }
        if(task.Status != task.Status){
            updatedTask.Status = task.Status;
        }
        if(task.Description != task.Description){
            updatedTask.Description = task.Description;
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
    [HttpDelete("api/tasks/{id}")]
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