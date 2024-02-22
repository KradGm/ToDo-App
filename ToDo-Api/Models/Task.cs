namespace ToDoProject;


public class Task{

    public long Id{get;set;}

    public string TaskName {get;set;}

    public Status Status{get;set;} 

    public string? Description {get;set;}

    public Task(long id, string name, Status status, string description){
        this.Id = id;
        this.TaskName = name;
        this.Status = status;
        this.Description = description;
    }

    public Task(long id, string name){
        this.Id = id;
        this.TaskName = name;
    }
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    public Task(){
        
    }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

}
