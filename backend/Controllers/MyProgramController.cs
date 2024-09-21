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
    [Route("GetMyProgramDataAsync")]
    public async Task<IActionResult> GetMyProgramDataAsync()
    {
        var myProgramDataResponse = await _myProgramDataAccessService.GetUserDataAsync<MyProgramDataResponse>();
        return Ok(myProgramDataResponse);
    }

    [HttpPost]
    [Route("AddMyProgramDataAsync")]
    public async Task<IActionResult> AddMyProgramDataAsync([FromBody] AddMyProgramDataRequestModel addMyProgramDataRequestModel)
    {
        var result = await _myProgramDataAccessService.AddUserDataAsync(addMyProgramDataRequestModel);
        if (result == null)
        {
            return BadRequest("Failed to add data.");
        }
        return Ok(result);
    }
}
