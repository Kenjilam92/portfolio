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
        
        ////////////////////////////////////////////////////////////////Login Logout

        [HttpGet("api/session")]
        public JsonResult CheckSession()
        {
            if(HttpContext.Session.GetInt32("UserId") == null)
            {
                return Json (new{IsSignIn = false});
            }
            else if(databases.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("UserId"))==null)
            {
                return Json (new{ IsSignIn = false,
                                  errors = "user not in database"});
            }
            else
            {
                return Json (new { IsSignIn = true,
                                   user = databases.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("UserId"))});
            }
        }
        
        [HttpPost ("api/users/login")]
        public JsonResult Login([FromBody]LoginUser user)
        {
            if(databases.Login(user,ModelState))
            {   
                var userData = databases.Users
                    .FirstOrDefault(u => u.Email == user.LoginEmail);
                HttpContext.Session.SetInt32("UserId",userData.UserId);
                return Json(new {   user = userData,
                                    IsSignIn = true
                                }
                );
            }
            var errorList = ModelState.ToDictionary(
                kvp => kvp.Key,
                kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
            );
            return Json( new {  msg = "failed",
                                errors = errorList
            });
        }       
        
        [HttpGet("api/logout")]
        public JsonResult Logout ()
        {   
            HttpContext.Session.Clear();
            return Json (new {msg = "loged out"});
        }
        

        //////////////////////////////////////////////////////////////////User
        [HttpPost ("api/users/register/{code}")]
        public JsonResult NewUser([FromBody]User newUser, string code)
        {   
            if(code=="" || code ==null)
            {
                return Json( new {  msg = "failed",
                                    errors = new { code = "you must need a code to register! Please contact me for the code"}
                });
            }
            if (databases.Invitations.FirstOrDefault(i => i.Code == code && i.IsUsed == false) == null)
            {
                System.Console.WriteLine("##############################");
                return Json( new {  msg = "failed",
                                    errors = new { code = "this invitation code is not valid "}
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
        
        
        [HttpPut("api/users/{id}")]
        public JsonResult ChangeUserRole([FromBody]Dictionary<string,string> a, [FromRoute]int id)
        {
            if (databases.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("UserId")).Role == "Owner" ||
                HttpContext.Session.GetInt32("UserId")==null)
            {
                databases.Users.FirstOrDefault(u => u.UserId == id).Role = a["role"];
                databases.SaveChanges();
                return Json (new {msg = "new role set"});
            }
            return Json(new{errors = "don't have authority"});
        }
        
        [HttpDelete("api/users/{id}")]
        public JsonResult DeleteUser(int id)
        {   
            if (databases.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("UserId")).Role == "Owner")
            {
                databases.Users.Remove(
                    databases.Users.FirstOrDefault(m => m.UserId==id)
                );
                databases.SaveChanges();
                return Json(new{msg = "deleted user"});
            }
            return Json(new{errors = "don't have authority"});
        }
        
        [HttpGet("api/users")]
        public JsonResult FetchUsers () 
        {
            if (databases.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("UserId")).Role == "Owner")
            {
                return Json(new{ msg= "ok", 
                                 users = databases.Users.OrderBy(u=>u.FirstName)
                                                        .OrderBy(u => u.Role)
                                                        .ToList()
                                });
            }
            return Json (new{ errors = "don't have authority"});
        }
        
        //////////////////////////////////////////////////////////////////Message
        
        [HttpPost("api/messages/new")]
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
        
        [HttpGet("api/messages")]
        public JsonResult FetchMessages()
        {   
            if (HttpContext.Session.GetInt32("UserId") == null)
            {
                return Json( new{   msg = "not sign in",
                                    IsSignIn = false
                                });
            }
            User select = databases.Users.FirstOrDefault(u => u.UserId== HttpContext.Session.GetInt32("UserId"));
            if (select.Role=="Owner"){
                var messagesList = databases.Messages
                    .OrderByDescending( m => m.CreateAt)
                    .Select(m => new { m.MessageId, m.Name, m.Email, m.Phone, m.Text, m.IsReplied, m.CreateAt})
                    .ToList();
                return Json (new{   IsSignIn = true,
                                    messages = messagesList,
                                    user = databases.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("UserId"))
                            });
            }else if(select.Role=="Supervisor"){
                var messagesList = databases.Messages
                    .Where(m => m.IsReplied==false)
                    .OrderByDescending( m => m.CreateAt)
                    .Select(m => new { m.MessageId, m.Name, m.Email, m.Phone, m.Text, m.IsReplied, m.CreateAt})
                    .ToList();
                return Json (new{   IsSignIn = true,
                                    messages = messagesList,
                                    user = databases.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("UserId"))
                            });
            }else if(select.Role=="Staff"){
                var messagesList = databases.Messages
                    .OrderByDescending( m => m.CreateAt)
                    .Select(m => new { m.MessageId, m.Name, m.Text, m.IsReplied, m.CreateAt})
                    .ToList();
                return Json (new{   IsSignIn = true,
                                    messages = messagesList,
                                    user = databases.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("UserId"))
                            });
            }else{
                return Json (new{   IsSignIn = true,
                                    errors = "do not have authority to view this",
                                    user = databases.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("UserId"))
                                });
            }
        }
        
        [HttpGet("api/messages/{id}/{cmd}")]
        public JsonResult ReplyMessage(int id, string cmd)
        {
            System.Console.WriteLine("###################################");
            System.Console.WriteLine(cmd);
            var select = databases.Messages.FirstOrDefault(m => m.MessageId == id);
            if(select==null)
            {
                return Json(new {errors = "can't find message"});
            }
            if (cmd == "replied")
            {   
                if (databases.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("UserId")).Role == "Owner" ||
                    databases.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("UserId")).Role == "Supervisor")
                {
                    select.IsReplied = true;
                    select.UpdateAt = DateTime.Now;
                    databases.SaveChanges();
                    return Json(new{msg = "replied"});
                }
                return Json(new{ errors = "don't have authority"});
            }
            else if(cmd == "unreplied")
            {   
                if (databases.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("UserId")).Role == "Owner")
                {
                    select.IsReplied = false;
                    select.UpdateAt = DateTime.Now;
                    databases.SaveChanges();
                    return Json(new{msg = "unreplied"});
                }
                return Json(new{ errors = "don't have authority"});
            }
            return Json(new{msg = "false api"});
        }
        
        [HttpDelete("api/messages/{id}")]
        public JsonResult DeleteMessage(int id)
        {
            if (databases.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("UserId")).Role == "Owner")
            {
                databases.Messages.Remove(
                    databases.Messages.FirstOrDefault(m => m.MessageId==id)
                );
                databases.SaveChanges();
                return Json(new{msg = "deleted message"});
            }
            
            return Json(new{errors = "don't have authority"});
        }

        //////////////////////////////////////////////////////////////////Invitation
        
        [HttpPost("api/invitation/new")]
        public JsonResult NewInvitaion ([FromBody]Invitation newInvite)
        {
            if (databases.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("UserId")).Role == "Owner" ||
                databases.Users.FirstOrDefault(u => u.UserId == HttpContext.Session.GetInt32("UserId")).Role == "Supervisor")
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
            return Json(new{errors = "don't have authority"});            
        }    
        
        [HttpGet("api/invitations")]
        public JsonResult ManageInvitation()
        {   
            if (HttpContext.Session.GetInt32("UserId") == null)
            {
                return Json (new{ errors = "not login"});
            }
            User select = databases.Users.FirstOrDefault(u => u.UserId== HttpContext.Session.GetInt32("UserId"));
            if(select.Role=="Owner"){
                var invitations = databases.Invitations
                    .OrderBy(i => i.CreateAt)
                    .OrderBy(i => i.IsUsed)
                    .Select(i => new{i.Code,i.IsUsed,i.CreateAt,i.UpdateAt})
                    .ToList();
                return Json(new { invitations = invitations });
            }
            else if(select.Role == "Supervisor" || select.Role == "Staff"){
                var invitations = databases.Invitations
                    .OrderBy(i => i.CreateAt)
                    .Where(i => i.IsUsed==false)
                    .Select(i => new{i.Code,i.IsUsed,i.CreateAt,i.UpdateAt})
                    .ToList();
                return Json(new { invitations = invitations });
            }
            return Json(new { errors = "do not have authority"});
        }
        
        /////////////////////////////////////////////////////////////
           
    }
}
