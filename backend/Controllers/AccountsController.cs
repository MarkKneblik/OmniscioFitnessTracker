using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authentication;

[ApiController]
[Route("[controller]")]
public class AccountsController : ControllerBase
{
    private readonly APIDbContext _dbContext;

    public AccountsController(APIDbContext dbContext)
    {
        _dbContext = dbContext;
    }


    [HttpGet]
    [AllowAnonymous]
    [Route("Login")]
    public IActionResult Login()
    {
        return Challenge(new AuthenticationProperties { RedirectUri = "https://localhost:5173/MyProgram" }, OpenIdConnectDefaults.AuthenticationScheme);
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("ClearCookies")]
    public IActionResult ClearCookies()
    {
        // Iterate through all the cookies in the request
        foreach (var cookie in Request.Cookies.Keys)
        {
            // Set the cookie to expire in the past
            Response.Cookies.Delete(cookie);
        }

        // Optionally, you can return a response indicating that the cookies were cleared
        return Ok(new { message = "All cookies have been cleared." });
    }
}