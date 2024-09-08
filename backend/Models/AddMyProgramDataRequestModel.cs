using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

// Request model for adding MyProgram data to the database
public class AddMyProgramDataRequestModel // Request model for adding MyProgram data to the database
{
    // Make all fields nullable so that we can use one model for addition of days, exercises, or sets
    [JsonPropertyName("type")]
    [Required]
    public string Type { get; set; } // Holds the type of data we will be saving, i.e. a day, exercise, or set

    [JsonPropertyName("dayOfWeek")]
    public string? DayOfWeek { get; set; }

    [JsonPropertyName("exercise")]
    public string? Exercise { get; set; }

    [JsonPropertyName("set")]
    public string? Set { get; set; }
}