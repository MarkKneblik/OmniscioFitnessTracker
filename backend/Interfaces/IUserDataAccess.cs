public interface IUserDataAccess
{
    Task<string> GetUserDataAsync(string email);
}


