using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;



var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("https://localhost:5257");


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Dependency injection of DbContext Class
builder.Services.AddDbContext<APIDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var provider = builder.Services.BuildServiceProvider();
var configuration = provider.GetRequiredService<IConfiguration>();
var frontendURL = configuration["frontend_url"];


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
    options.LoginPath = "/Accounts/Login";
})
.AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options =>
{
    options.Authority = "https://accounts.google.com/";
    options.ClientId = builder.Configuration["Authentication:OIDC:ClientId"];
    options.ClientSecret = builder.Configuration["Authentication:OIDC:ClientSecret"];
    options.ResponseType = OpenIdConnectResponseType.Code;
    options.CallbackPath = "/signin-oidc";
    options.SignedOutCallbackPath = "/signout-oidc";
    options.SignedOutRedirectUri = $"{frontendURL}/Login";
    options.SaveTokens = true;
    options.Scope.Add("openid");
    options.Scope.Add("profile");
    options.Scope.Add("email");

    options.Events = new OpenIdConnectEvents
    {   
        // If authentication fails
        OnAuthenticationFailed = async context =>
        {
            // Store the exception in HttpContext.Items
            context.HttpContext.Items["OnAuthenticationFailed"] = context.Exception;
            context.HandleResponse();
            context.Response.Redirect($"{frontendURL}/Login");
            await Task.CompletedTask;
        },

        // If authentication succeds
        OnTokenValidated = async context =>
        {
            // Store Claims Principal in HttpContext.Items 
            context.HttpContext.Items["OnTokenValidated"] = context.Principal;

            // Extract user information from the token that is already validated by OpenID Connect
            var userIdentifier = context.Principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userName = context.Principal.FindFirst(ClaimTypes.Name)?.Value;
            var userEmail = context.Principal.FindFirst(ClaimTypes.Email)?.Value;

            // Create list of claims
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userIdentifier ?? string.Empty),
                new Claim(ClaimTypes.Name, userName ?? string.Empty),
                new Claim(ClaimTypes.Email, userEmail ?? string.Empty)
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            // Create a claims principal to represent the authenticated user
            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

            // Sign in with cookie authentication scheme to persist the authentication and create a cookie-based session
            await context.HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);

            var accessToken = context.SecurityToken.RawData;

            // Save access token for API calls
            context.HttpContext.Response.Cookies.Append("accessToken", accessToken, new CookieOptions
            {
                Path ="/",
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTimeOffset.UtcNow.AddDays(30)
            });

            await Task.CompletedTask;
        },
    };
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseHsts();
}

app.UseCors(options => {
    options.WithOrigins(frontendURL).AllowAnyHeader().AllowAnyMethod().AllowCredentials();
});


app.UseHttpsRedirection();
app.UseRouting();


app.UseAuthentication(); 
app.UseMiddleware<AuthenticationMiddleware>(); 
app.UseAuthorization();  

app.MapControllers();

app.Run();

