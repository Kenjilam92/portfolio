using System;
using System.ComponentModel.DataAnnotations;

namespace portfolio_backend.Models
{
    public class Example
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
        public string Email {get;set;}
        [Required]
        [MinLength(10,ErrorMessage="Please type 10 numbers")]
        [MaxLength(10,ErrorMessage="Please type 10 numbers")]
        public string Phone {get;set;}
        public bool IsReplied {get;set;} = false;
        [Required]
        public DateTime CreateAt {get;set;} = DateTime.Now;
        public DateTime UpdateAt {get;set;} = DateTime.Now;
    }
}