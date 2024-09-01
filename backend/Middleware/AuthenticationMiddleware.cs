public class AuthenticationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IConfiguration _configuration;
  
    public AuthenticationMiddleware(RequestDelegate next, IConfiguration configuration)
    {
        _next = next;
        _configuration = configuration;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.User?.Identity != null && !context.User.Identity.IsAuthenticated && context.Request.Path.StartsWithSegments("/Program"))
        {
            // Handle unauthenticated requests to endpoints in /MyProgram
            context.Response.StatusCode = 401; // Unauthorized
            await context.Response.WriteAsync("Unauthorized access.");
            return; // Terminate middleware pipeline prematurely       
        }
        else if (context.User?.Identity != null && !context.User.Identity.IsAuthenticated && context.Request.Path.StartsWithSegments("/Accounts/Logout"))
        {
            // Handle unauthenticated requests to endpoints in /MyAccount
            context.Response.StatusCode = 401; // Unauthorized
            await context.Response.WriteAsync("Unauthorized access.");
            return; // Terminate middleware pipeline prematurely
        }

        await _next(context);
    }
}