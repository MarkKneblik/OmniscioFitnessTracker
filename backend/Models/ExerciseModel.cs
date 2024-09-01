using System.ComponentModel.DataAnnotations;

public class ExerciseModel
{
    [Key]
    public int ExerciseId { get; set; }
    
    [Required]
    public string ExerciseName {get; set;} = string.Empty;

    // Foreign key for DayModel
    [Required]
    public int DayId {get; set;} = 0;
}