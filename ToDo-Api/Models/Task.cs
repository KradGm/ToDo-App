namespace ToDoProject;


public class Task{

    public long Id{get;set;}

    public required string TaskName {get;set;}

    public Status Status{get;set;} 

    public string? Description {get;set;}

}
