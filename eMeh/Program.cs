using eMeh.DBContext;
using eMeh.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

var emehDatabaseSettings = builder.Configuration.GetSection("EmehDatabase").Get<EmehDatabaseSettings>();
var connectionString = emehDatabaseSettings?.ConnectionString ?? throw new NullReferenceException(nameof(emehDatabaseSettings.ConnectionString));
var databaseName = emehDatabaseSettings?.DatabaseName ?? throw new NullReferenceException(nameof(emehDatabaseSettings.DatabaseName));

builder.Services.AddDbContext<EmehDbContext>(options => options.UseMongoDB(connectionString, databaseName));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
