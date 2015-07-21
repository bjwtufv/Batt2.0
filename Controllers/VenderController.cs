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
    public class VenderController : ApiController
    {
        private BattEntities m_db = new BattEntities();
        public IEnumerable<Vender> GetAll()
        {
            return m_db.Vender.ToList();
        }
        public Vender GetBy(int id){
            return m_db.Vender.Find(id);
        }
        public HttpResponseMessage PostVender(Vender vender)
        {
            if (vender == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "Vender is not allow null");
            }

            var venderList = m_db.Vender.AsNoTracking().FirstOrDefault(item => item.VenderName == vender.VenderName);

            //exist same "venderName" when insert new denied
            if (venderList != null && vender.VenderId != venderList.VenderId)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "the vender already exist");
            }
             //exist same "venderName" when updata
            if (vender.VenderId != 0)
            {
                m_db.Vender.Attach(vender);
                m_db.Entry(vender).State = EntityState.Modified;
               
            }
            else
            {
                m_db.Vender.Add(vender);
            }
            try
            {
                m_db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch
            {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "Operator forbidden");
            }         
        }

        public HttpResponseMessage Delete(int id)
        {
            var vender = m_db.Vender.Find(id);
            if (vender == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "already deleted");
            }
            try
            {
                m_db.Vender.Remove(vender);
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
