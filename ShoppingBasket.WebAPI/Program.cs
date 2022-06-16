using Microsoft.OpenApi.Models;
using Serilog;
using ShoppingBasket.Core;
using ShoppingBasket.Core.Common.Exceptions;
using ShoppingBasket.Infrastructure;

var MyAllowSpecificOrigins = "MyAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin()
                                 .AllowAnyMethod()
                                 .AllowAnyHeader();
                      });
});

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

#region Swagger
builder.Services.AddSwaggerGen(swag =>
{
    swag.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Shopping Basket",
    });
});
#endregion

#region Configure serilog
Log.Logger = new LoggerConfiguration()
      .CreateLogger();
#endregion

builder.Services.AddApplication();

builder.Services.AddInfrastructure();

var app = builder.Build();
Log.Information("Shopping Basket application!");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);

app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
