using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace portfolio_backend.Models.Validation
{
    public class RegexEmailAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var reg = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
            if (value == null)
            {
                return new ValidationResult("Email can't be empty");
            }
            if (!reg.IsMatch((string)value))
                return new ValidationResult((string) value + " is not a valid email");
            return ValidationResult.Success;
        }
    }
}