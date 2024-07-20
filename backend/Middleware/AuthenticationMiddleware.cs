using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

public class AuthenticationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IServiceScopeFactory _serviceScopeFactory;

    public AuthenticationMiddleware(RequestDelegate next, IServiceScopeFactory serviceScopeFactory)
    {
        _next = next;
        _serviceScopeFactory = serviceScopeFactory;
    }

    public async Task InvokeAsync(HttpContext context)
    {
       context.Response.OnStarting(async () =>
        {
            var scope = _serviceScopeFactory.CreateScope();
            var _dbContext = scope.ServiceProvider.GetRequiredService<APIDbContext>();

            // Check if the "OnAuthenticationFailed" entry exists in the Items dictionary
            if (context.Items.ContainsKey("OnAuthenticationFailed"))
            {
                // Retrieve the exception
                var exception = context.Items["OnAuthenticationFailed"] as Exception;

                
                // Log the exception message
                Console.WriteLine($"Authentication failed: {exception.Message}");

                // Redirect to login page
                context.Response.Redirect("/Home/Error?message=" + Uri.EscapeDataString(exception.Message));
                

                await Task.CompletedTask;
            }
            else if (context.Items.ContainsKey("OnTokenValidated"))
            {
                var principal = context.Items["OnTokenValidated"] as ClaimsPrincipal;

                // If there is a claims principal
                if (principal != null)
                {
                    var email = principal.FindFirst(ClaimTypes.Email).Value;
                    var name = principal.FindFirst(ClaimTypes.Name).Value; 

                    // Query DB to check if there is a user associated with this email
                    var user = await _dbContext.Users.FirstOrDefaultAsync(user => user.Email == email);

                    // If this user doesn't exist
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

                await Task.CompletedTask;
            }
        });

        // Call the next middleware in the pipeline
        await _next(context);
    }




}
