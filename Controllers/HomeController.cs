using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using portfolio_backend.Models;

namespace portfolio_backend.Controllers
{
    public class HomeController : Controller
    {
        private Context databases {get;set;}
        public HomeController(Context context)
        {
            databases = context;
        }
        // [HttpGet("")]
        // public IActionResult Index()
        // {
        //     return View();
        // }

        [HttpPost]
        [Route("api/messages/new")]
        public JsonResult NewMessage([FromBody]Message newMessage)
        {
            if (ModelState.IsValid)
            {   
                databases.Messages.Add(newMessage);
                databases.SaveChanges();
                return Json(new {msg = "ok"});
            }
            var errorList = ModelState.ToDictionary(
                kvp => kvp.Key,
                kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
            );
            return Json( new {  msg = "failed",
                                errors = errorList
            });
        }
        [Route ("api/users/register/{code}")]
        public JsonResult NewUser([FromBody]User newUser, string code)
        {   
            if (databases.Invitations.FirstOrDefault(i => i.Code == code && i.IsUsed == false) == null)
            {
                System.Console.WriteLine("##############################");
                return Json( new {  msg = "failed",
                                    errors = new { code = "this is invitation is not valid "}
            });
            }  
            if(databases.Register(newUser,ModelState))
            {
                System.Console.WriteLine("$$$$$$$$$$$$$$$$$$$$$$$$$$");
                databases.Invitations.FirstOrDefault(i=>i.Code==code && i.IsUsed== false).UpdateAt = DateTime.Now;
                databases.Invitations.FirstOrDefault(i=>i.Code==code && i.IsUsed== false).IsUsed = true;
                databases.SaveChanges();
                HttpContext.Session.SetInt32("UserId",newUser.UserId);
                return Json (new {msg = "ok"});
            }
            var errorList = ModelState.ToDictionary(
                kvp => kvp.Key,
                kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
            );
            System.Console.WriteLine("##############################");
            return Json( new {  msg = "failed",
                                errors = errorList
            });
        }
        [Route ("api/users/login")]
        public JsonResult Login([FromBody]LoginUser user)
        {
            if(databases.Login(user,ModelState))
            {   
                var userData = databases.Users
                    .FirstOrDefault(u => u.Email == user.LoginEmail);
                HttpContext.Session.SetInt32("UserId",userData.UserId);
                return Json(new {   user = userData,
                                    IsSignIn = true
                                });
            }
            var errorList = ModelState.ToDictionary(
                kvp => kvp.Key,
                kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
            );
            return Json( new {  msg = "failed",
                                errors = errorList
            });
        }
        [Route("api/invitation/new")]
        public JsonResult NewInvitaion ([FromBody]Invitation newInvite)
        {
            if (ModelState.IsValid)
            {
                databases.Invitations.Add(newInvite);
                databases.SaveChanges();
                return Json(new{msg = "ok"});
            }
            var errorList = ModelState.ToDictionary(
                kvp => kvp.Key,
                kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
            );
            return Json( new {  msg = "failed",
                                errors = errorList
            });
        }

        [HttpGet]
        [Route("api/messages")]
        public JsonResult AllMessages()
        {   
            if (HttpContext.Session.GetInt32("UserId") == null)
            {
                return Json( new {  msg = "not sign in",
                                    IsSignIn = false
                                });
            }
            var messagesList = databases.Messages
                .OrderByDescending( m => m.CreateAt)
                .Select(m => new { m.MessageId, m.Name, m.Email, m.Phone, m.Text, m.IsReplied, m.CreateAt})
                .ToList();
            return Json (new{   IsSignIn = true,
                                messages = messagesList,
                                user = databases.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("UserId"))
                            });
        }
        [Route("api/logout")]
        public JsonResult Logout ()
        {   
            HttpContext.Session.Clear();
            return Json (new {msg = "loged out"});
        }
        [Route("api/invitations")]
        public JsonResult ManageInvitation()
        {   
            if (HttpContext.Session.GetInt32("UserId") == null)
            {
                return Json (new{ errors = "please login"});
            }
            var invitations = databases.Invitations
                .Where(i => i.UserId == HttpContext.Session.GetInt32("UserId"))
                .OrderBy(i => i.CreateAt)
                .Select(i => new{i.Code,i.IsUsed,i.CreateAt,i.UpdateAt})
                .ToList();
            return Json(new {   invitations = invitations,
                                user = databases.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("UserId"))
                });
        }
        
    }
}
