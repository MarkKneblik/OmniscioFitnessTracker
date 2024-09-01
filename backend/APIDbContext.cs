using Microsoft.EntityFrameworkCore;

public class APIDbContext : DbContext
{
    public APIDbContext(DbContextOptions option) : base(option)
    {

    }

    public DbSet<AccountModel> Accounts {get; set;}
    public DbSet<DayModel> Days {get; set;}
    public DbSet<ExerciseModel> Exercises {get; set;}
    public DbSet<SetModel> Sets {get; set;}
}