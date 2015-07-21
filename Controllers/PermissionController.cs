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
    public class PermissionController : ApiController
    {
        private BattEntities m_db=new BattEntities();

        public IEnumerable<Permission> GetAll()
        {
            return m_db.Permission.ToList();
        }

        public Permission GetBy(int id){
            return m_db.Permission.Find(id);
        }

        public HttpResponseMessage Post(Permission permission)
        {
            if (permission == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden,"PermissionName is not allow null");
            }
            var permis = m_db.Permission.AsNoTracking().FirstOrDefault(item => item.PermissionName == permission.PermissionName);

            //exist same "PermissionName"
            if (permis!=null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "Have same permission name");
            }
            else
            {
                if (permission.PermissionId == 0)
                {
                    m_db.Permission.Add(permission);
                }
                else
                {
                    m_db.Permission.Attach(permission);
                    m_db.Entry(permission).State = EntityState.Modified;
                }
                m_db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }          
        }
        public HttpResponseMessage Delete(int id)
        {
            var permission = m_db.Permission.Find(id);
            if (permission==null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "already deleted");
            }
            try
            {
                m_db.Permission.Remove(permission);
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
