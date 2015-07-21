using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Farasis.Models;
using System.Data.Entity;

namespace Farasis.Controllers
{
    //Table User，Group Releration relationship
    public class UserGroupController : ApiController
    {
        private BattEntities m_db = null;

        public UserGroupController()
        {
            m_db = new BattEntities();
        }
        public UserGroupController(BattEntities db)
        {
            m_db = db;
        }

        public IEnumerable<UserGroup> Get()
        {
            return m_db.UserGroup.Where(item=>item.User.Active==true);
        }
        public UserGroup GetById(int id)
        {
            return m_db.UserGroup.AsNoTracking().Where(item=>item.UserGroupId==id).FirstOrDefault();
        }
        public UserGroup GetByUserId(int userId)
        {
            return m_db.UserGroup.AsNoTracking().Where(item => item.UserId == userId).FirstOrDefault();
        }
        public HttpResponseMessage Post(UserGroup userGroup)
        {
            if (userGroup == null)
            {
                return Request.CreateResponse(HttpStatusCode.Forbidden);
            }
            var ug = m_db.UserGroup.AsNoTracking().FirstOrDefault(item => item.UserGroupId == userGroup.UserGroupId);

            if (ug != null)
            {
                ug.GroupId = userGroup.GroupId;
                m_db.UserGroup.Attach(ug);
                m_db.Entry(ug).State = EntityState.Modified;                               
            }
            else
            {
                m_db.UserGroup.Add(userGroup);             
            }
            m_db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}

//db.SaveChanges();
        //    public GroupController()
        //    {
        //        m_db = new BattEntities();
        //    }  
        //    public GroupController(BattEntities repoistory)
        //    {
        //         m_db = repoistory;
        //    }
        //    // GET api/group
        //    public IEnumerable<Group> Get()
        //    {
        //        return m_db.Group.ToList();
        //    }

        //    // GET api/group/5
        //    public Group Get(int id)
        //    {
        //        var group = m_db.Group.Find(id);
        //        return m_db.Group.Find(id);
        //    }

        //    // POST api/group
        //    public HttpResponseMessage Post(Group group)
        //    {
        //        //is exist same "GroupName"
        //        var groupList = m_db.Group.AsNoTracking().FirstOrDefault(item =>item.GroupName==group.GroupName);
        //        if (groupList != null)
        //        {
        //            return Request.CreateResponse(HttpStatusCode.Forbidden);
        //        }
        //        else
        //        {
        //            //update group
        //            if (group.GroupId!=0)
        //            {
        //                m_db.Group.Attach(group);
        //                m_db.Entry(group).State = EntityState.Modified;
        //                m_db.SaveChanges();
        //                return Request.CreateResponse(HttpStatusCode.OK);
        //            }
        //            //add
        //            m_db.Group.Add(group);
        //            m_db.SaveChanges();
        //            return Request.CreateResponse(HttpStatusCode.OK);
        //        }
        //    }

        //    // PUT api/group/5
        //    public void Put(int id, [FromBody]string value)
        //    {
        //    }

        //    // DELETE api/group/5
        //    public void Delete(int id)
        //    {
        //        var group = m_db.Group.Find(id);
        //        m_db.Group.Remove(group);
        //        m_db.SaveChanges();
        //    }
        //}
        //
