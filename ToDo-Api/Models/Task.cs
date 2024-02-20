namespace ToDoProject;


public class Task{

    public long Id{get;set;}

    public required string TaskName {get;set;}

    public Status status{get;set;} 

    public required string Description{get;set;}

}