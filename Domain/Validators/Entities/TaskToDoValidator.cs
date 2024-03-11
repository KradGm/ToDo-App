using Domain.Abstractions.Data;
using Domain.Data;
using Domain.Entities;
using FluentValidation;

namespace Domain.Validators.Entities;

public class TaskToDoValidator : AbstractValidator<TaskToDo>
{
    private readonly IDbContext _context;
    public TaskToDoValidator(IDbContext context)
    {
         _context = context;        

        RuleFor(task => task.TaskName)
            .NotNull().WithMessage("É necessario ter um nome")
            .MinimumLength(1).WithMessage("O nome deve ter ao menos 1 caractere.")
            .MaximumLength(20).WithMessage("Esse nome passa de  20 caracteres");
            
        RuleFor(task => task.TaskName)
            .Must(name => !name.StartsWith(" ")).WithMessage("As tarefas não devem começar com espaço")
            .Matches("^[a-zA-Z0-9 ]*$").WithMessage("O nome da tarefa só pode conter letras, números e espaços");

        RuleFor(task => task.Status)
            .IsInEnum()
            .WithMessage("Esse Status não existe");

        RuleFor(task => task.Description)
            .MaximumLength(255)
            .WithMessage("A descrição não pode ter mais de 255 caracteres");
    }
    private bool isUnique(TaskToDo task, long id){
        return !_context.Tasks.Any(t=>t.Id == id && t!=task);
    }

}

