using System.ComponentModel.DataAnnotations;

public class AccountModel
{
    [Key]
    public int AccountId { get; set; }
    
    [Required]
    public string NameOfUser {get; set;} = string.Empty;

    [Required]
    public string Email {get; set;} = string.Empty;
}