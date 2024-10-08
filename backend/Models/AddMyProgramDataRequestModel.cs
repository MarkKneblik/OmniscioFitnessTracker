// Request model for adding MyProgram data to the database
public class AddMyProgramDataRequestModel // Request model for adding MyProgram data to the database
{
    public string Type { get; set; } // Holds the type of data we will be saving, i.e. a day, exercise, or set

    // Make rest of the fields nullable so that we can use one model for addition of days, exercises, or sets
    public string? DayOfWeek { get; set; }

    public string? Exercise { get; set; }

    public string? Set { get; set; }
}