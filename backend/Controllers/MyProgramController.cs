using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
[Authorize]
public class MyProgramController : ControllerBase
{
    private readonly APIDbContext _dbContext; 
    private readonly MyProgramDataAccessService _myProgramDataAccessService;

    public MyProgramController(APIDbContext dbContext, MyProgramDataAccessService myProgramDataAccessService)
    {
        _dbContext = dbContext;
        _myProgramDataAccessService = myProgramDataAccessService;
    }

    [HttpGet]
    [Route("GetMyProgramData")]
    public async Task<IActionResult> GetMyProgramData()
    {
        var myProgramDataResponse = _myProgramDataAccessService.GetUserDataAsync();
        return Ok();
    }
}