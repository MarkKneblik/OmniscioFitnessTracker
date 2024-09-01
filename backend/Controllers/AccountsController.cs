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
    private readonly AccountService _accountService;

    public AccountsController(APIDbContext dbContext, AccountService accountService)
    {
        _dbContext = dbContext;
        _accountService = accountService;

    }


    [HttpGet]
    [AllowAnonymous]
    [Route("Login")]
    public IActionResult Login()
    {
        return Challenge(new AuthenticationProperties { RedirectUri = "/Accounts/HandleLogin" }, OpenIdConnectDefaults.AuthenticationScheme);
    }

    [HttpGet]
    [Authorize]
    [Route("HandleLogin")]
    public async Task HandleLogin()
    {
        await _accountService.FindOrCreateAccount();
    }


    [HttpPost]
    [Authorize]
    [Route("Logout")]
     public async Task<IActionResult> Logout()
    {
        HttpContext.Response.Cookies.Delete("accessToken"); // Delete access token
        
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme); // Sign out the user using cookie authentication scheme

        return Content("Logout successful.", "text/plain");
    }
}