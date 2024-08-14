using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Dependency injection of DbContext Class
builder.Services.AddDbContext<APIDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var provider = builder.Services.BuildServiceProvider();
var configuration = provider.GetRequiredService<IConfiguration>();
var frontendURL = configuration.GetValue<string>("frontend_url");


// Add HttpContextAccessor
builder.Services.AddHttpContextAccessor();

// Configure Authentication and Authorization
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
.AddCookie(options =>
{
    options.Cookie.Name = "OmniscioFitnessTrackerCookie";
    options.ExpireTimeSpan = TimeSpan.FromDays(30);
    options.LoginPath = "/Account/Login";
})
.AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options =>
{
    options.Authority = "https://accounts.google.com/";
    options.ClientId = builder.Configuration["Authentication:OIDC:ClientId"];
    options.ClientSecret = builder.Configuration["Authentication:OIDC:ClientSecret"];
    options.ResponseType = OpenIdConnectResponseType.Code;
    options.CallbackPath = "http://localhost:5256/signin-oidc";
    options.SaveTokens = true;
    options.Scope.Add("openid");
    options.Scope.Add("profile");
    options.Scope.Add("email");

    options.Events = new OpenIdConnectEvents
    {   
        // If authentication fails
        OnAuthenticationFailed = context =>
        {
            // Store the exception in HttpContext.Items
            context.HttpContext.Items["OnAuthenticationFailed"] = context.Exception;
            context.HandleResponse();
            return Task.CompletedTask;
        },

        // If authentication succeds
        OnTokenValidated = context =>
        {
            // Store the exception in HttpContext.Items
            context.HttpContext.Items["OnTokenValidated"] = context.Principal;
            return Task.CompletedTask;
        }
    };
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseRouting();

app.UseCors(options => {
    options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
});




app.UseAuthentication();
app.UseMiddleware<AuthenticationMiddleware>();
app.UseAuthorization();

app.MapControllers();

app.Run();

