using Domain.Entities;
using FluentValidation;

namespace Domain.Validators.Entities;

public class TaskToDoValidator : AbstractValidator<TaskToDo>
{
    public TaskToDoValidator()
    {
        RuleFor(task => task.TaskName).NotNull().MinimumLength(1).MaximumLength(50).WithMessage("É necessario ter um nome");
        RuleFor(task => task.Status).IsInEnum().WithMessage("Esse Status não existe");
    }

}

