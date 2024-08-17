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
        return Challenge(new AuthenticationProperties { RedirectUri = "/signin-oidc" }, OpenIdConnectDefaults.AuthenticationScheme);
    }
}