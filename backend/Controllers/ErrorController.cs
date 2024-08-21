using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("[controller]")]
public class ErrorController : ControllerBase
{
    private readonly IConfiguration _configuration;

    private string frontendURL;

    public ErrorController(IConfiguration configuration)
    {
        _configuration = configuration;
        frontendURL = configuration["frontend_url"];
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("Error")]
    public IActionResult Error()
    {
        return Redirect($"{frontendURL}/");
    }
}
