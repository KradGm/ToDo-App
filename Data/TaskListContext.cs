namespace TodoApi.Models;
using Microsoft.EntityFrameworkCore;
using ToDoProject;

public class TaskListContext : DbContext{

    public TaskListContext(DbContextOptions<TaskListContext> options)
    :base(options)
    {

    }
    public DbSet<Task> Tasks{get;set;}



}