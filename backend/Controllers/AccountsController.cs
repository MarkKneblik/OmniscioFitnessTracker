using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

public class UserController : ControllerBase
{
    private readonly APIDbContext _dbContext;
    public UserController(APIDbContext dbContext)
    {
        _dbContext = dbContext;
    }



}
