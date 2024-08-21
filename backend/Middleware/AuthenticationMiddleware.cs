public class AuthenticationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IConfiguration _configuration;
    private string frontendURL;

    public AuthenticationMiddleware(RequestDelegate next, IConfiguration configuration)
    {
        _next = next;
        _configuration = configuration;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (!context.User.Identity.IsAuthenticated && context.Request.Path.StartsWithSegments("/MyProgram"))
        {
            // Handle unauthenticated requests to endpoints in /MyProgram
            context.Response.StatusCode = 401; // Unauthorized
            await context.Response.WriteAsync("Unauthorized access.");
            context.Response.Redirect("/Error/Error");
            return;       
        }

        await _next(context);
    }
}