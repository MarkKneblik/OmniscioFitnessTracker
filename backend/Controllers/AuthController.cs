
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public IActionResult Auth()
    {
        return Ok();
    }
}