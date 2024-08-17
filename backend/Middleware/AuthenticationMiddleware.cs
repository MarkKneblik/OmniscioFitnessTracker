using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

public class AuthenticationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IServiceScopeFactory _serviceScopeFactory;

     private readonly IConfiguration _configuration;

    public AuthenticationMiddleware(RequestDelegate next, IServiceScopeFactory serviceScopeFactory, IConfiguration configuration)
    {
        _next = next;
        _serviceScopeFactory = serviceScopeFactory;
        _configuration = configuration;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Handle the request before calling the next middleware
        var scope = _serviceScopeFactory.CreateScope();
        var _dbContext = scope.ServiceProvider.GetRequiredService<APIDbContext>();

        // Check if the request context contains authentication-related items
        if (context.Items.ContainsKey("OnAuthenticationFailed"))
        {
            var exception = context.Items["OnAuthenticationFailed"] as Exception;
            if (exception != null)
            {
                // Log the exception message
                // Use ILogger instead of Console.WriteLine in production
                Console.WriteLine($"Authentication failed: {exception.Message}");

                // Redirect to error page
                context.Response.Redirect(_configuration["frontend_url"]);
                return; // Exit early to avoid further processing
            }
        }
        else if (context.Items.ContainsKey("OnTokenValidated"))
        {
            var principal = context.Items["OnTokenValidated"] as ClaimsPrincipal;

            if (principal != null)
            {
                var email = principal.FindFirst(ClaimTypes.Email)?.Value;
                var name = principal.FindFirst(ClaimTypes.Name)?.Value;

                if (email != null && name != null)
                {
                    // Query DB to check if there is a user associated with this email
                    var user = await _dbContext.Users.FirstOrDefaultAsync(user => user.Email == email);

                    if (user == null)
                    {
                        var newUser = new UserModel
                        {
                            Email = email,
                            Name = name
                        };

                        await _dbContext.Users.AddAsync(newUser);
                        await _dbContext.SaveChangesAsync();
                    }
                }
            }
        }

        // Call the next middleware in the pipeline
        await _next(context);
    }
}
