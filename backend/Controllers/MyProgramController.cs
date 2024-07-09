using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class MyProgramController : ControllerBase
{
    private readonly APIDbContext _dbContext; 

    public MyProgramController(APIDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    [Route("UploadAttachment")]
    public async Task<IActionResult> UploadAttachment(IFormFile file, string caption)
    {
        


        return Ok("File uploaded successfully.");
    }


}