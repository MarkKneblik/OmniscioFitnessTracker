using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

[ApiController]
[Route("[controller]")]
public class AccountsController : ControllerBase
{
    private readonly APIDbContext _dbContext;
    private readonly IConfiguration _configuration;

    private string frontendURL;

    public AccountsController(APIDbContext dbContext, IConfiguration configuration)
    {
        _dbContext = dbContext;
        _configuration = configuration;
        frontendURL = configuration["frontend_url"];
    }


    [HttpGet]
    [AllowAnonymous]
    [Route("Login")]
    public IActionResult Login()
    {
        return Challenge(new AuthenticationProperties { RedirectUri = $"{frontendURL}/MyProgram" }, OpenIdConnectDefaults.AuthenticationScheme);
    }

    [HttpGet]
    [Authorize]
    [Route("Logout")]
     public IActionResult Logout()
    {
        // Sign out the user and specify the authentication schemes (OIDC and cookies)
        return SignOut(
            new AuthenticationProperties { RedirectUri = $"{frontendURL}/" },
            OpenIdConnectDefaults.AuthenticationScheme,
            CookieAuthenticationDefaults.AuthenticationScheme
        );
    }
}