using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using portfolio_backend.Models.Validation;

namespace portfolio_backend.Models
{
    public class User
    {
        [Key]
        public int UserId {get;set;}
        [Required]
        [MinLength(2,ErrorMessage="Name must have at least 2 characters") ]
        public string Name {get;set;}
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email{get;set;}
        [Required]
        [DataType(DataType.PhoneNumber)]
        [MinLength(10,ErrorMessage="Please type 10 numbers")]
        [MaxLength(10,ErrorMessage="Please type 10 numbers")]
        public string Phone{get;set;}
        [Required]
        [DataType(DataType.Password)]
        [MinLength(8,ErrorMessage="Password need to be at least 8 charcters")]
        [RegexPass]
        public string Password {get;set;}
        public List<Invitation> Invitations {get;set;}
        public DateTime CreateAt {get;set;} = DateTime.Now;
        public DateTime UpdateAt {get;set;} = DateTime.Now;
        [NotMapped]
        [Compare("Password")]
        [DataType(DataType.Password)]
        public string CFPass{get;set;}
    }
}