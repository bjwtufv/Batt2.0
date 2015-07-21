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
    public class OrderItemController : ApiController
    {
        private BattEntities m_db = new BattEntities();

        public IEnumerable<OrderItem> GetAll()
        {
            return m_db.OrderItem.ToList();
        }

        // GET: api/OrderItem
        public IEnumerable<OrderItem> GetByOrderId(int orderId)
        {
            return m_db.OrderItem.Where(item => item.OrderId == orderId).ToList();
        }
        //public OrderItem GetByOrderId(int orderId)
        //{
        //    return m_db.OrderItem.Find(orderId);
        //}
        public HttpResponseMessage Post(OrderItem orderItem)
        {
            if(orderItem==null){
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "OrderItem is not allow null");
            }
            var ol=m_db.OrderItem.AsNoTracking().FirstOrDefault(item=>item.OrderId==orderItem.OrderId);
           
            if(orderItem.OrderItemId==0){
                m_db.OrderItem.Add(orderItem);
            }
            else{
                ol.Qty=orderItem.Qty;
                ol.Dist=orderItem.Dist;
                ol.Farasis=orderItem.Farasis;
                ol.Description=orderItem.Description;
                ol.AcctNo=orderItem.AcctNo;
                ol.Unit=orderItem.Unit;
                ol.Price=ol.Price;
            }
            try
            {
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
            {   m_db.OrderItem.Remove(ol);
                m_db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch
            {
                return Request.CreateErrorResponse(HttpStatusCode.Forbidden, "operater forbidden");
            }
        }
        public HttpResponseMessage DeleteByOrderId(int orderId)
        {
            var ol = m_db.OrderItem.Where(item => item.OrderId == orderId);
            if (ol == null)
            {
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            try
            {
                m_db.OrderItem.RemoveRange(ol);
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
