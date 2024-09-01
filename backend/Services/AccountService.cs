using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

public class AccountService
{
    private readonly APIDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AccountService(APIDbContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<AccountModel> FindOrCreateAccount() 
    {
        var userEmail = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Email)?.Value;
        
        if (userEmail != null)
        {
            var account =  await _dbContext.Accounts.FirstOrDefaultAsync(account => account.Email == userEmail);

            if (account == null)
            {
                var newAccount = new AccountModel
                {
                    Email = userEmail,
                    NameOfUser = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Name)?.Value
                };

                await _dbContext.Accounts.AddAsync(newAccount);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                return Task.CompletedTask;
            }
        }
        
    }

}
