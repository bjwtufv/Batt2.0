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
    
    public class GroupPermissionController : ApiController
    {
        private BattEntities m_db = new BattEntities();

        public IEnumerable<GroupPermission> GetAll()
        {
            return m_db.GroupPermission.ToList() ;
        }
        public GroupPermission GetById(int id)
        {
            return m_db.GroupPermission.Find(id);
        }
        public IEnumerable<GroupPermission> GetByGroupId(int groupId){
            return m_db.GroupPermission.Where(item => item.GroupId == groupId).ToList();
        }
        public HttpResponseMessage Post(GroupPermission groupPermission)
        {
            if (groupPermission == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "GroupPermission is not allow null");
            }
            var gp = m_db.GroupPermission.AsNoTracking().FirstOrDefault(item => item.GroupPermissionId == groupPermission.GroupPermissionId);

            if (groupPermission.GroupPermissionId == 0)
            {
                m_db.GroupPermission.Add(groupPermission);
            }
            else
            {
                gp.GroupId = groupPermission.GroupId;
                gp.PermissionId = groupPermission.PermissionId;
                gp.Context = groupPermission.Context;
            }
            try
            {
                m_db.GroupPermission.Attach(gp);
                m_db.Entry(gp).State = EntityState.Modified;
                m_db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch
            {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "operater forbidden");
            }
        }
        public HttpResponseMessage Delete(int OrderItemId)
        {
            var ol = m_db.OrderItem.Find(OrderItemId);
            if (ol == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "already deleted");
            }
            try
            {
                m_db.OrderItem.Remove(ol);
                m_db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch
            {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "operater forbidden");
            }
        }
        public HttpResponseMessage DeleteByGroupId(int groupId)
        {
            var gp = m_db.GroupPermission.Where(item => item.GroupId == groupId);
            if (gp == null)
            {
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            try
            {
                m_db.GroupPermission.RemoveRange(gp);
                m_db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch
            {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "operater forbidden");
            }
        }
    }
}
