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
    public class GroupController : ApiController
    {
        private BattEntities m_db = null;

        public GroupController()
        {
            m_db = new BattEntities();
        }
        public GroupController(BattEntities repoistory)
        {
            m_db = repoistory;
        }

        public IEnumerable<Group> Get()
        {
            return m_db.Group.ToList();
        }


        public Group GetById(int id)
        {
            var group = m_db.Group.Find(id);
            return m_db.Group.Find(id);
        }
        public HttpResponseMessage Post(Group group)
        {
            if (group == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "GroupName is not allow null");
            }
            //is exist same "GroupName"
            var groupList = m_db.Group.AsNoTracking().FirstOrDefault(item => item.GroupName == group.GroupName);
            if (groupList != null)
            {
                return Request.CreateResponse(HttpStatusCode.Forbidden);
            }
            else
            {
                try
                {
                    //update group
                    if (group.GroupId != 0)
                    {
                        m_db.Group.Attach(group);
                        m_db.Entry(group).State = EntityState.Modified;
                        m_db.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.OK);
                    }
                    // add new group
                    else
                    {
                        m_db.Group.Add(group);
                        m_db.SaveChanges();
                        //set default permission
                        var permissionNameLists = m_db.Permission.ToArray();
                        for (int i = 0; i < permissionNameLists.Length; i++)
                        {
                            GroupPermission gp = new GroupPermission();
                            gp.GroupId = group.GroupId;
                            gp.PermissionId = permissionNameLists[i].PermissionId;
                            gp.Context = false;
                            m_db.GroupPermission.Add(gp);
                            m_db.SaveChanges();
                        }
                        return Request.CreateResponse(HttpStatusCode.OK);
                    }

                } catch
                {
                    return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "operater forbidden");
                }
            }
        }
        public void Put(int id, [FromBody]string value)
        {
        }

        public HttpResponseMessage Delete(int id)
        {
            var group = m_db.Group.Find(id);
            if (group == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "already deleted");
            }
            try
            {
                //delete grouppermission by groupid
                var gp = m_db.GroupPermission.Where(item => item.GroupId == id);
                if (gp == null)
                {
                    m_db.Group.Remove(group);
                    m_db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
                m_db.GroupPermission.RemoveRange(gp);
                m_db.SaveChanges();

                //delete group
                m_db.Group.Remove(group);
                m_db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch
            {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "forbidden deleted");
            }


        }
    }
}
