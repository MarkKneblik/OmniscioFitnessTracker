
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost]
    [AllowAnonymous]
    [Route("Auth")]
    public IActionResult Auth()
    {
        return Ok("This is a test");
    }
}