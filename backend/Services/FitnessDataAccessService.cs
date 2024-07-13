using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class FitnessDataAccessService : IUserDataAccess
{
    private readonly APIDbContext _dbContext;
    private readonly IUserDataAccess _userDataAccess;

    public FitnessDataAccessService(APIDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    public async Task<string> GetUserDataAsync(string email)
    {
        
    }
}
