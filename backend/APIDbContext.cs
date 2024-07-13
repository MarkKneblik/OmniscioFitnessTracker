using Microsoft.EntityFrameworkCore;

public class APIDbContext : DbContext
{
    public APIDbContext(DbContextOptions option) : base(option)
    {

    }

    public DbSet<UserModel> Users {get; set;}
}