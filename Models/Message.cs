using System;
using System.ComponentModel.DataAnnotations;
using portfolio_backend.Models.Validation;

namespace portfolio_backend.Models
{
    public class Message
    {
        
        [Key]
        public int MessageId {get;set;}
        [Required]
        [MinLength(2,ErrorMessage="Name must have more than 2 characters")]
        public string Name {get;set;}
        [Required]
        [MinLength(10,ErrorMessage="Your message is too short! Please give me more details")]
        public string Text {get;set;}
        [Required]
        [DataType(DataType.EmailAddress)]
        [RegexEmail]
        public string Email {get;set;}
        [Required]
        [DataType(DataType.PhoneNumber)]
        [RegexPhone]
        public string Phone {get;set;}
        public bool IsReplied {get;set;} = false;
        [Required]
        public DateTime CreateAt {get;set;} = DateTime.Now;
        public DateTime UpdateAt {get;set;} = DateTime.Now;
    } 
}