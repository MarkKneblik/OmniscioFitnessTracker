public class FitnessDataAccessService : IUserDataAccess
{
    private readonly APIDbContext _dbContext;

    public FitnessDataAccessService(APIDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    public async Task<string> GetUserDataAsync(string email)
    {
        
    }
}
