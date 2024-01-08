using eMeh.DBContext;
using eMeh.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

var emehDatabaseSettings = builder.Configuration.GetSection("EmehDatabase").Get<EmehDatabaseSettings>();
var connectionString = emehDatabaseSettings?.ConnectionString ?? throw new NullReferenceException(nameof(emehDatabaseSettings.ConnectionString));
var databaseName = emehDatabaseSettings?.DatabaseName ?? throw new NullReferenceException(nameof(emehDatabaseSettings.DatabaseName));

builder.Services.AddDbContext<EmehDbContext>(options => options.UseMongoDB(connectionString, databaseName));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme   = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme      = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(options => options.Events = new JwtBearerEvents
{
    OnMessageReceived = ctx =>
    {
        var token = ctx.HttpContext.Request.Cookies["token"];

        if (!string.IsNullOrEmpty(token))
        {
            try
            {
                var tokenHandler    = new JwtSecurityTokenHandler();
                var secretKey       = builder.Configuration.GetSection("JWT:Secret").Value ?? throw new NullReferenceException("Encoding key was not found.");
                var key             = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));

                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    IssuerSigningKey            = key,
                    ValidateIssuerSigningKey    = true,
                    ValidateIssuer              = false,
                    ValidateAudience            = false,
                    ClockSkew                   = TimeSpan.Zero,
                    ValidateLifetime            = true

                }, out SecurityToken validatedToken);

                var jwtToken        = (JwtSecurityToken)validatedToken;

                var email           = jwtToken.Claims.Single(x => x.Type == ClaimTypes.Email).Value;

                var claim           = new Claim(ClaimTypes.Email, email);
                var claims          = new List<Claim>() { claim };
                var claimsIdentity  = new ClaimsIdentity(claims, JwtBearerDefaults.AuthenticationScheme);
                ctx.Principal       = new ClaimsPrincipal(claimsIdentity);

                ctx.HttpContext.Response.StatusCode = 200;
                ctx.Success();
                
            }
            catch
            {
                ctx.Response.Cookies.Delete("token");
                ctx.Response.Cookies.Delete("UserId");
            }
        }

        return Task.CompletedTask;
    }
});

builder.Services.ConfigureApplicationCookie(options =>
{

    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.Zero;

});

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

app.UseAuthentication();
app.UseAuthorization();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
