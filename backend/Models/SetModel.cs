using System.ComponentModel.DataAnnotations;

public class SetModel
{
    [Key]
    public int SetId { get; set; }

    [Required]
    public string Content {get; set;} = string.Empty;

    // Foreign key for ExerciseModel
    [Required]
    public int ExerciseId {get; set;} = 0;
}