using Farasis.Models;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
namespace Farasis.Controllers
{
    public class UserController : ApiController
    {

        // GET api/user
        private BattEntities m_db = null;

        public UserController()
        {
            m_db = new BattEntities();
        }
        public UserController(BattEntities repoistory)
        {
            m_db = repoistory;

        }

        public IEnumerable<User> GetAll()
        {
            return m_db.User.ToList();
        }
        public User GetById(int id)
        {
            return m_db.User.Find(id);
        }

        public User GetUserByEmail(string email, string password)
        {
            var user = m_db.User.AsNoTracking().FirstOrDefault(item => item.Email == email &&
                item.Password == password &&
                item.Active == true);
            return user;
        }
        //public User GetUserByEmail(string email)
        //{
        //    return m_db.User.AsNoTracking().FirstOrDefault(item => item.Email == email);
        //}

        //public HttpResponseMessage GetExistingUser(string email, string password)
        //{
        //    string loginMessage = "";
        //    var user = m_db.User.AsNoTracking().FirstOrDefault(item => item.Email ==email); 
        //    loginMessage =
        //        (user == null) ? "User is not existing" :
        //        (user.Password != password) ? "Password error" :
        //        (user.Active != true) ? "User is not active" : "";

        //    //login fail
        //    if (loginMessage != "")
        //    {
        //        var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
        //        {
        //            Content = new StringContent(loginMessage),
        //            ReasonPhrase = "Not Found"
        //        };
        //        return resp;
        //    }
        //    return Request.CreateResponse(HttpStatusCode.OK);
        //    //else
        //    //{
        //    //    var resp = new HttpResponseMessage(HttpStatusCode.OK)
        //    //    {
        //    //        Content = new StringContent(string.Format("Welcome {0} {1}", user.FirstName, user.LastName)),
        //    //        ReasonPhrase = "Login Success"
        //    //    };
        //    //    return resp;
        //    //}
        //}
        // POST api/user  
        public HttpResponseMessage GetErrorMessage(HttpStatusCode code, string message)
        {
            var resp = new HttpResponseMessage(code)
            {
                Content = new StringContent(message),
                ReasonPhrase = message
            };
            return resp;

        }
        public HttpResponseMessage PostUser(User user)
        {
            if (user == null)
            {
                return GetErrorMessage(HttpStatusCode.Forbidden, "Account is not allow null");      
            }
            User userList = m_db.User.AsNoTracking().FirstOrDefault(item => item.UserId == user.UserId );

            if (IsExistingEmail(user))
            {
                return GetErrorMessage(HttpStatusCode.Forbidden, "Email aleardy exist");              
            }

           if (userList != null)
            {
                // Modify existing user.
                m_db.User.Attach(user);
                m_db.Entry(user).State = EntityState.Modified;
               
            }
            else
            {
                // Add new user.
                m_db.User.Add(user);
                m_db.SaveChanges();
                //add default group
                UserGroup ug = new UserGroup();
                ug.UserId= user.UserId;
                m_db.UserGroup.Add(ug);
            }
           m_db.SaveChanges();
           return Request.CreateResponse(HttpStatusCode.OK);
        }

        private bool IsExistingEmail(User user)
        {
            User existingUser = m_db.User.AsNoTracking().FirstOrDefault(item => item.Email == user.Email && item.UserId != user.UserId);
            return (existingUser != null) ? true : false;
        }

        public HttpResponseMessage DeleteUser(int id)
        {
            User user = m_db.User.AsNoTracking().FirstOrDefault(item => item.UserId == id);
            if (user != null)
            {
                user.Active = false;
                m_db.User.Attach(user);
                m_db.Entry(user).State = EntityState.Modified;
                m_db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
        }
    }
}
