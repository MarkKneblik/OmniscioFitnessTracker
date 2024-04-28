using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("[controller]")]
public class AttachmentsController : ControllerBase
{
    private readonly APIDbContext _dbContext; 

    public AttachmentsController(APIDbContext dbContext)
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