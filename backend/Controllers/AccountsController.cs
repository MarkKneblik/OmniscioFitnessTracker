using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

public class AccountsController : ControllerBase
{
    private readonly IConfiguration _config;

    public AccountsController(IConfiguration config)
    {
        _config = config;
    }

    [Route("signin-google")]
    public async Task<IActionResult> LoginWithGoogleAsync(string returnUrl = "/")
    {
        var frontend_url = _config.GetValue<string>("frontend_url");

        var properties = new AuthenticationProperties { RedirectUri = frontend_url };

        return Redirect(frontend_url);
    }
}
