using Domain.Abstractions.Data;
using Domain.Abstractions.Services;
using Domain.Data;
using Domain.Entities;
using Domain.Services;
using Domain.Validators.Entities;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);
var CorsPolicy = "_corsPolicy";
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddScoped<IDbContext, DbContextService>();
builder.Services.AddScoped<IValidator<TaskToDo>, TaskToDoValidator>();
builder.Services.AddScoped<IService, Service>();
builder.Services
    .AddValidatorsFromAssembly(Assembly.GetExecutingAssembly())
    .AddFluentValidationAutoValidation();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddDbContext<DbContextService>(options =>
options.UseInMemoryDatabase("InMemoryDatabase"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(opt =>
{
    opt.AddPolicy(name: CorsPolicy, policy =>
    {
        policy.WithOrigins("*")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(CorsPolicy);

app.MapControllers();

app.Run();
