using System.ComponentModel.DataAnnotations;

public class DayModel
{
    [Key]
    public int DayId { get; set; }
    
    [Required]
    public string DayOfWeek {get; set;} = string.Empty;

    // Foreign key for AccountModel
    [Required]
    public int AccountId {get; set;} = 0;
}