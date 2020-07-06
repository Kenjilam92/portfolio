using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace portfolio_backend.Models.Validation
{
    public class RegexPhoneAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var reg = new Regex(@"\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})");
            if (value == null)
            {
                return new ValidationResult("Phone numbers can't be empty");
            }
            if (!reg.IsMatch((string)value))
                return new ValidationResult((string)value + " is not a valid phone numbers");
            return ValidationResult.Success;
        }
    }
}