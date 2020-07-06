using System.ComponentModel.DataAnnotations;

namespace portfolio_backend.Models
{
    public class LoginUser
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        [Display(Name="Email")]
        public string LoginEmail {get;set;}
        [Required]
        [DataType(DataType.Password)]
        [Display(Name="Password")]
        public string LoginPassword {get;set;}
    }
}