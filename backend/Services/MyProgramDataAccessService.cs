using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

public class MyProgramDataAccessService : IUserDataAccess
{
    private readonly APIDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly HttpContext _httpContext;
    private readonly ClaimsPrincipal _user;
    private readonly ClaimsIdentity _identity;
    private readonly string _userEmail;
 
    public MyProgramDataAccessService(APIDbContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;

        _httpContext = _httpContextAccessor.HttpContext;

        // Represent the user with a Claims Principal
        _user = _httpContext?.User;

        // Create Claims Identity
        _identity = _user?.Identity as ClaimsIdentity;

        // Extract user's email and name from Claims Identity
        _userEmail = _identity?.FindFirst(ClaimTypes.Email)?.Value;
    }
    public async Task<MyProgramDataResponse> GetUserDataAsync()
    {
        var account = _dbContext.Accounts.FirstOrDefault(account => account.Email == _userEmail);

        // Find all days whose accountId matches the user's accountId
        var days = await _dbContext.Days
            .Where(day => day.AccountId == account.AccountId)
            .ToListAsync();

        // Find all exercises whose dayId matches one contained within the list of days
        var exercises = await _dbContext.Exercises
            .Where(exercise => days.Select(day => day.DayId).Contains(exercise.DayId)) 
            .ToListAsync();

        // Find all sets whose exerciseId matches one conatined within the list of exercises
        var sets = await _dbContext.Sets
            .Where(set => exercises.Select(exercise => exercise.ExerciseId).Contains(set.ExerciseId)) 
            .ToListAsync();

        // Map models to data transfer objects
        var daysDTO = days.Select(day => new DayDTO
        {
            DayId = day.DayId,
            DayOfWeek = day.DayOfWeek
        }).ToList();

        var exercisesDTO = exercises.Select(exercise => new ExerciseDTO
        {
            ExerciseId = exercise.ExerciseId,
            ExerciseName = exercise.ExerciseName
        }).ToList();

        var setsDTO = sets.Select(set => new SetDTO
        {
            SetId = set.SetId,
            Content = set.Content
        }).ToList();

        return new MyProgramDataResponse
        {
            Days = daysDTO,
            Exercises = exercisesDTO,
            Sets = setsDTO
        };
    }
}
