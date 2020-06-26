using System;
using System.ComponentModel.DataAnnotations;

namespace portfolio_backend.Models
{
    public class Invitation
    {
        [Key]
        public int InvitationId {get;set;}
        [Required]
        [MinLength(8,ErrorMessage="Minimum lenght is 8 characters")]
        public string Code {get;set;}
        public bool IsUsed {get;set;} = false;
        public int UserId {get;set;}
        public User Creator {get;set;}
        public DateTime CreateAt {get;set;} = DateTime.Now;
        public DateTime UpdateAt {get;set;} = DateTime.Now;
        
    }
}