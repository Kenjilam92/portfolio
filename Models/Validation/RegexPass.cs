using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace portfolio_backend.Models.Validation
{
    public class RegexPassAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var reg = new Regex(@"^(?=.*?\d)(?=.*?[a-zA-Z])(?=.*?[.!@#$%^&*+=])[A-Za-z\d,!@#$%^&*+=]{8,}$");
            if (value == null)
            {
                return new ValidationResult("Password can't be empty");
            }
            if (!reg.IsMatch((string)value))
                return new ValidationResult("Password must have at least 1 letter, 1 number and 1 special character.");
            return ValidationResult.Success;
        }
    }
}