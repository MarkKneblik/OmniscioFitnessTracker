using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
[Authorize]
public class MyProgramController : ControllerBase
{
    private readonly APIDbContext _dbContext; 

    public MyProgramController(APIDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    [Route("GetNumOfDays")]
    public async Task<IActionResult> GetNumOfDays()
    {
        


        return Ok();
    }

    [HttpGet]
    [Route("GetNumOfExercises")]
    public async Task<IActionResult> GetNumOfExercises()
    {
        


        return Ok();
    }



}