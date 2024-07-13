using System.ComponentModel.DataAnnotations;

public class UserModel
{
    [Key]
    public int UserId { get; set; }
    
    [Required]
    public string Name {get; set;} = string.Empty;

    [Required]
    public string Email {get; set;} = string.Empty;
}