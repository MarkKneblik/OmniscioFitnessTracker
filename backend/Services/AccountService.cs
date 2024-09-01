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

    public async Task FindOrCreateAccount() 
    {
        var httpContext = _httpContextAccessor.HttpContext;

        // Represent the user
        var user = httpContext?.User;

        // Create Claims Identity
        var identity = user?.Identity as ClaimsIdentity;

        // Extract user's email and name from Claims Identity
        var userEmail = identity?.FindFirst(ClaimTypes.Email)?.Value;
        var userFirstName = identity?.FindFirst(ClaimTypes.GivenName)?.Value;
        var userLastName = identity?.FindFirst(ClaimTypes.Surname)?.Value;
        
        if (userEmail != null) // If an email was extracted from Claims Identity
        {
            // Attempt to find an account tied to the user making the request
            var account =  await _dbContext.Accounts.FirstOrDefaultAsync(account => account.Email == userEmail);

            // If no account was found related to this user
            if (account == null)
            {
                var newAccount = new AccountModel
                {
                    Email = userEmail,
                    UserFullName = string.Format("{0} {1}", userFirstName, userLastName)
                };

                await _dbContext.Accounts.AddAsync(newAccount);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
