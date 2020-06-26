using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace portfolio_backend.Models
{
    public class Context : DbContext
    {
        public Context (DbContextOptions options) : base (options) {}
        private PasswordHasher<User> regHasher = new PasswordHasher<User>() ;
        private PasswordHasher<LoginUser> logHasher = new PasswordHasher<LoginUser>(); 
        public DbSet<User> Users {get;set;}
        public DbSet<Message> Messages {get;set;}
        public DbSet<Invitation> Invitations {get;set;}
        public bool Register(User newUser, ModelStateDictionary ModelState) 
        {
            if (ModelState.IsValid)
            {   
                if(Users.Any(u => u.Email == newUser.Email))
                {
                    ModelState.AddModelError("Email","This email is already registed. Please Login!");
                    return false;
                }
                // if (Users.Any(u => u.Email == newUser.Phone ))
                string hash = regHasher.HashPassword(newUser,newUser.Password);
                newUser.Password = hash;
                Users.Add(newUser);
                SaveChanges();
                return true;
            }
            else 
                return false;
        }
        public bool Login (LoginUser user, ModelStateDictionary ModelState)
        {
            if(ModelState.IsValid)
            {   
                User select = Users.FirstOrDefault(u => u.Email == user.LoginEmail);
                if(select == null)
                {
                    ModelState.AddModelError("LoginEmail", "Email is not registed!");
                    return false;
                }
                var decode = logHasher.VerifyHashedPassword(user, select.Password, user.LoginPassword);
                if (decode == 0)
                {
                    ModelState.AddModelError("LoginPassword","Password is not correct");
                    return false;
                }
                return true;
            }
            return false;
        }
    }
}